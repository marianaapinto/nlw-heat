import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";

import styles from "./App.module.scss";
import { SendMessageForm } from "./components/SendMessageForm";
import { useAuth } from "./contexts/authentication";

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      }`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
