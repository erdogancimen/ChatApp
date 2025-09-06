import React from "react";
import styles from "./styles.module.css";

function UserEvents({ nickname }) {
  return (
    <div className={styles.userevents}>
      <p>
        Hoş geldin, <strong> {nickname}</strong>!
      </p>
      <button
        type="button"
        className={styles.logoutButton}
        onClick={() => {
          localStorage.removeItem("nickname");
          localStorage.removeItem("userToken");
          window.location.reload();
        }}
      >
        Çıkış yap
      </button>
    </div>
  );
}

export default UserEvents;
