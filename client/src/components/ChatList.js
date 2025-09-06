import React, { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import styles from "./styles.module.css";
import ChatItem from "./ChatItem";

function ChatList({ nickname }) {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);

  // Mesajlar değiştiğinde scroll'u en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatlist}>
      <div>
        {messages.map((item, index) => (
          <ChatItem key={index} item={item} currentUser={nickname} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatList;
