import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../../services/api";
import LogoImage from "../../assets/logo.svg";
import styles from "./styles.module.scss";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // every 3 secs, checks if message queue has messages; if yes
    // adds the oldest message of the queue with the already existent messages
    // this is to contorll the message flow in several messages are sent at same time
    const timer = setInterval(() => {
      if (!!messagesQueue.length) {
        setMessages((prevMessages) =>
          [messagesQueue[0], ...prevMessages.slice(0, 2)].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    api.get<Message[]>("messages/last3").then(({ data }) => setMessages(data));
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImage} alt="DoWhile 20221" />
      <ul className={styles.messageList}>
        {!!messages.length &&
          messages.map((message) => (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImg}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
