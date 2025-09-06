import io from "socket.io-client";
let socket;

export const init = () => {
  if (socket) return socket;

  const token = localStorage.getItem("userToken"); 
  socket = io("http://localhost:3001", {
    transports: ["websocket"],
    auth: { token },
  });

  socket.on("connect", () => console.log("Connected:", socket.id));
  socket.on("disconnect", () => console.log("Disconnected"));

  return socket;
};

export const joinRoom = (nickname, callback) => {
  if (!socket) return;
  socket.emit("join-room", nickname, (serverToken) => {
    if (serverToken) {
      localStorage.setItem("userToken", serverToken); 
      if (callback) callback(serverToken);
    }
  });
};

export const sendMessage = (message) => {
  if (socket) socket.emit("new-message", message);
};

export const subscribeChat = (cb) => {
  if (!socket) return;
  socket.off("receive-message");
  socket.on("receive-message", (message) => cb(message));
};

export const subscribeInitialMessages = (cb) => {
  if (!socket) return;
  socket.off("message-list");
  socket.on("message-list", (messages) => cb(messages));
};

export const subscribeReconnectUser = (cb) => {
  if (!socket) return;
  socket.off("reconnect-user");
  socket.on("reconnect-user", cb);
};
