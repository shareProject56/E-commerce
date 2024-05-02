import styles from "./TxnFailed.module.css";
import Navbar from "./Navbar";

function TxnFailed({ cartNav }) {
  return (
    <>
      <Navbar cartNav={cartNav} />
      <h1>Transaction Failed</h1>;
    </>
  );
}

export default TxnFailed;
