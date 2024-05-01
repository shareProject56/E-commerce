import styles from "./Logo.module.css";

function Logo() {
  return (
    <img
      src="/Logo/png/logo-no-background.png"
      className={styles.logoImage}
      alt="logo"
    />
  );
}

export default Logo;
