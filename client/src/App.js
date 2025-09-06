import styles from "./components/styles.module.css";
import { ChatProvider } from "./context/ChatContext";
import Container from "./components/Container";

function App() {
  return (
    <ChatProvider>
      <div className={styles.appBackground}>
        <Container />
      </div>
    </ChatProvider>
  );
}

export default App;
