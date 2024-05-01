import styles from "./ModalSignIn.module.css";

function ModalSignIn({ setIsModalOpen, setIsEnterDetailsOpen }) {
  return (
    <>
      <div className={styles.divModal}>
        <h1
          className={styles.modalCloseBtn}
          onClick={() => setIsModalOpen(false)}
        >
          X
        </h1>

        <h2>Please enter your details to Log In</h2>
        <input type="text" placeholder="Enter your e-mail Id..." />
        <input type="text" placeholder="Enter Password" />
        <button> Submit</button>
        <button
          onClick={() => {
            setIsEnterDetailsOpen(true);
            setIsModalOpen(false);
          }}
        >
          Continue as Guest
        </button>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
}

export default ModalSignIn;
