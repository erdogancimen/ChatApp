import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";
import UserEvents from "./UserEvents";
import NicknameForm from "./Nickname";
import { useChat } from "../context/ChatContext";
import styles from "./styles.module.css";
import {
  init,
  subscribeChat,
  subscribeInitialMessages,
  subscribeReconnectUser,
  joinRoom,
} from "../socketApi";

function Container() {
  const { setMessages } = useChat();
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const socket = init();

    // reconnect-user geldiğinde nickname state güncellenir
    subscribeReconnectUser(({ nickname }) => {
      setNickname(nickname);
    });

    subscribeInitialMessages((messages) => setMessages(messages));
    subscribeChat((message) => setMessages((prev) => [...prev, message]));
  }, [setMessages]);

  const handleJoin = (nick) => {
    joinRoom(nick, () => {
      setNickname(nick); // join-room'dan sonra state güncelleniyor
    });
  };

  // nickname null ise form göster
  if (!nickname) return <NicknameForm onJoin={handleJoin} />;

  return (
    <div className={styles.container}>
      <UserEvents nickname={nickname} />
      <ChatList nickname={nickname} />
      <ChatForm nickname={nickname} />
    </div>
  );
}

export default Container;
