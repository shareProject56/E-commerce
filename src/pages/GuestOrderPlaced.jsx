import Navbar from "../components/Navbar";
import styles from "./GuestOrderPlaced.module.css";

const orderID = Math.floor(1000000 + Math.random() * 9000000);
const fiveDaysAheadTimeStamp = new Date(
  new Date().getTime() + 5 * 24 * 60 * 60 * 1000
);

function GuestOrderPlaced({ guestUserData }) {
  const { name, add, mob, paymentMode } = guestUserData;

  return (
    <>
      <Navbar />
      <div className={styles.divProduct}>
        <h2>
          Thank you {name} for Ordering from us!!! Your order with Order ID:
          AKI-O{orderID} has been placed succesfully with{" "}
          {paymentMode === "_cod" ? "COD" : "Online method"}. Your order will be
          delivered to you before: {fiveDaysAheadTimeStamp.toDateString()}.
        </h2>
      </div>
    </>
  );
}

export default GuestOrderPlaced;
