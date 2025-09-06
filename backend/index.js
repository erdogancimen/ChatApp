const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const Messages = require("./lib/Messages");
const client = require("./clients/redis");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());

app.get("/", (req, res) => res.end("Merhaba Socket.IO"));

const users = {}; // token => { nickname, socketId }

function generateToken() {
  return Math.random().toString(36).substring(2, 12);
}

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;

  // Eğer frontend token gönderdi ve backend tanıyorsa reconnect
  if (token && users[token]) {
    socket.nickname = users[token].nickname;
    users[token].socketId = socket.id;
    console.log("Existing user reconnected:", socket.nickname);

    socket.emit("reconnect-user", { nickname: socket.nickname, token });

    Messages.list((data) => socket.emit("message-list", data));
    return;
  }

  // Yeni kullanıcı join-room ile token alacak
  socket.on("join-room", (nickname, callback) => {
    if (!nickname || socket.nickname) return;

    socket.nickname = nickname;
    const newToken = generateToken();
    users[newToken] = { nickname, socketId: socket.id };
    client.set(newToken, nickname);

    console.log(`${nickname} joined with token:`, newToken);
    if (callback) callback(newToken);

    const systemMessage = {
      system: true,
      message: `${nickname} odaya katıldı`,
      when: Date.now(),
    };
    
    // Sistem mesajını veritabanına kaydet
    Messages.upsert({
      nickname: "Sistem",
      message: `${nickname} odaya katıldı`,
      system: true
    });
    
    io.emit("receive-message", systemMessage);

    Messages.list((data) => socket.emit("message-list", data));
  });

  socket.on("new-message", (message) => {
    if (!socket.nickname) return;
    const msg = { nickname: socket.nickname, message, when: Date.now() };
    Messages.upsert(msg);
    io.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    const tokenKey = Object.keys(users).find(
      (key) => users[key].socketId === socket.id
    );
    if (tokenKey) {
      const nickname = users[tokenKey].nickname;
      const systemMessage = {
        system: true,
        message: `${nickname} odadan ayrıldı`,
        when: Date.now(),
      };
      
      // Sistem mesajını veritabanına kaydet
      Messages.upsert({
        nickname: "Sistem",
        message: `${nickname} odadan ayrıldı`,
        system: true
      });
      
      io.emit("receive-message", systemMessage);
      client.del(tokenKey);
      delete users[tokenKey];
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 listening on *:${PORT}`));
