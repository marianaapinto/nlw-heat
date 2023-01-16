import { VscGithub } from "react-icons/vsc";
import { useAuth } from "../../contexts/authentication";
import styles from "./styles.module.scss";

export function LoginBox() {
  const { signInUrl, user } = useAuth();
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Login and share your message</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithub size={24} />
        Login with GHithub
      </a>
    </div>
  );
}
