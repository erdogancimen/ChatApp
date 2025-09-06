import { useState, useEffect } from "react";
import styles from "./styles.module.css";

function NicknameForm({ onJoin }) {
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
      setTimeout(() => {
        handleAutoJoin(savedNickname);
      }, 200);
    }
  }, []);

  const handleAutoJoin = (nick) => {
    if (!nick.trim()) return;
    onJoin(nick);
    localStorage.setItem("nickname", nick);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAutoJoin(nickname);
  };

  return (
    <div className={styles.nicknameContainer}>
      <form className={styles.nicknameForm} onSubmit={handleSubmit}>
        <h2>Mini Chat Uygulamasına Hoş Geldiniz!</h2>
        <p>Lütfen bir kullanıcı adı girin:</p>
        <input
          type="text"
          className={styles.nicknameInput}
          placeholder="Kullanıcı adınızı yazın"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <br />
        <button  type="submit">Odaya Katıl</button>
      </form>
    </div>
  );
}

export default NicknameForm;
