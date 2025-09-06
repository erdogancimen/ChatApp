import styles from "./styles.module.css";

function ChatItem({ item, currentUser }) {
  // Sistem mesajları 
  if (item.system) {
    return <div className={styles.systemMessage}>{item.message}</div>;
  }

  // Kendi mesajın sağda, diğerleri solda
  const isMe = item.nickname === currentUser;
  return (
    <div className={`${styles.chatItem} ${isMe ? styles.right : ""}`}>
      <div>
        <div className={styles.itembalon}>
          <b>{item.nickname}</b>
        </div>
        {item.message}
      </div>
    </div>
  );
}

export default ChatItem;
