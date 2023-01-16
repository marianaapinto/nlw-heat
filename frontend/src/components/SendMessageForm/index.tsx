import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { useAuth } from "../../contexts/authentication";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export const SendMessageForm = () => {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    await api.post("messages", { message });
    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImg}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}></strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={handleSendMessage}
        action=""
        className={styles.sendMessageForm}
      >
        <label htmlFor="Message">Message</label>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Write your message"
        />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};
