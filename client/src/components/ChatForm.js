import { useState } from "react";
import styles from "./styles.module.css";
import { sendMessage } from "../socketApi";

function ChatForm({ nickname }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(message); // artık sadece backend'e gönderiyoruz
    setMessage(""); // inputu temizle
  };

  return (
    <div>
      <form className={styles.chatForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.textInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesaj yazın"
        />
        <button type="submit" onClick={handleSubmit}>
          Gönder
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
