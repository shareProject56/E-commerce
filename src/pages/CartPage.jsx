import { useRef, useState } from "react";
import ModalSignIn from "../components/ModalSignIn";
import Navbar from "../components/Navbar";
import styles from "./CartPage.module.css";
import { Link } from "react-router-dom";

function CartPage({
  cartNav,
  cart,
  setCart,
  setCartNav,
  product,
  setProducts,
  guestUserData,
  setGuestUserData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterDetailsOpen, setIsEnterDetailsOpen] = useState(false);
  const [isConfirmDetailsOpen, setIsConfirmDetailsOpen] = useState(false);

  const boxRef = useRef(null);

  const [guestUserName, setGuestUserName] = useState("");
  const [guestUserMob, setGuestUserMob] = useState("");
  const [guestUserAdd, setGuestUserAdd] = useState("");
  const { name, mob, add } = guestUserData;

  const totalPrice = Math.trunc(
    cart.reduce((acc, el) => el.price * el.options[0].quantity + acc, 0)
  );

  // console.log(cart);
  function handleDeleteItem(val) {
    setCart((cur) => cur.filter((el) => el.id !== val));
    setCartNav((cur) => cur - 1);
    setProducts((cur) =>
      cur.map((elem) =>
        elem.id === val
          ? {
              ...elem,
              options: elem.options.map((el) => {
                return { ...el, isAddedToCart: false };
              }),
            }
          : elem
      )
    );
  }

  function handleIncraeaseQuantity(val) {
    setCart((cur) =>
      cur.map((ele) =>
        ele.id === val
          ? {
              ...ele,
              options: ele.options.map((el) =>
                el.id === val ? { ...el, quantity: el.quantity + 1 } : el
              ),
            }
          : ele
      )
    );
  }

  function handleDecraeaseQuantity(val) {
    setCart((cur) =>
      cur.map((ele) =>
        ele.id === val
          ? {
              ...ele,
              options: ele.options.map((el) =>
                el.id === val
                  ? {
                      ...el,
                      quantity:
                        el.quantity <= 1 ? el.quantity : el.quantity - 1,
                    }
                  : el
              ),
            }
          : ele
      )
    );
  }

  function handleSubmitEnterDetails(e) {
    e.preventDefault();

    setGuestUserData(() => {
      return { name: guestUserName, mob: guestUserMob, add: guestUserAdd };
    });
    setIsConfirmDetailsOpen(true);
    console.log(boxRef.current);
    boxRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function handlePaymentOption(val) {
    // console.log(val);
    if (val === "_cod") {
      // console.log("You have place an order with COD");
      setGuestUserData((cur) => {
        return { ...cur, paymentMode: val };
      });
      // console.log(guestUserData);
    }
    if (val === "_netBanking") {
      // console.log("You have place an order with Net Banking");
      setGuestUserData((cur) => {
        return { ...cur, paymentMode: val };
      });
      // console.log(guestUserData);
    }
  }

  function handlePlaceOrder(val) {
    console.log(val);
  }

  return (
    <div className={styles.divCartPage}>
      <Navbar cartNav={cartNav} />
      <div className={styles.divProduct}>
        {cart.length <= 0 ? (
          <h1>Your cart is Empty, Add items in Your cart to Buy!!!</h1>
        ) : (
          cart.map((product) => (
            <div className={styles.divInsideProduct} key={product.title}>
              <img src={product.image} className={styles.productImage} />
              <h3>{product.title}</h3>
              <h4>Price: ₹{product.price}</h4>
              <h4>
                <span onClick={() => handleDecraeaseQuantity(product.id)}>
                  ➖
                </span>
                <span className={styles.spanQuantity}>
                  {product.options[0].quantity}
                </span>
                <span onClick={() => handleIncraeaseQuantity(product.id)}>
                  ➕
                </span>
              </h4>
              <h1 onClick={() => handleDeleteItem(product.id)}>&times;</h1>
            </div>
          ))
        )}
        <div className={styles.divCartBuy}>
          <h2>Total Price: ₹ {totalPrice}</h2>
          <h2
            className={styles.h3CartBtn}
            onClick={() => {
              if (cart.length <= 0) {
                alert("Please add items in your cart to Buy !!");
                return;
              }
              setIsModalOpen(true);
            }}
          >
            Buy Items
          </h2>
        </div>
      </div>
      {isModalOpen && (
        <ModalSignIn
          setIsModalOpen={setIsModalOpen}
          setIsEnterDetailsOpen={setIsEnterDetailsOpen}
        />
      )}
      {isEnterDetailsOpen && (
        <div className={styles.divProduct} ref={boxRef}>
          <h2>Enter Details</h2>
          <form onSubmit={(e) => handleSubmitEnterDetails(e)}>
            <ol>
              <li>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  value={guestUserName}
                  onChange={(e) => setGuestUserName(e.target.value)}
                />
              </li>
              <br />
              <li>
                <label htmlFor="mobNum">Mobile: </label>
                <input
                  type="text"
                  id="mobNum"
                  value={guestUserMob}
                  onChange={(e) => setGuestUserMob(e.target.value)}
                />
              </li>
              <br />
              <li>
                <label htmlFor="address">Address: </label>
                <input
                  type="text"
                  id="address"
                  value={guestUserAdd}
                  onChange={(e) => setGuestUserAdd(e.target.value)}
                />
              </li>
            </ol>
            <button>Add Details</button>
          </form>
        </div>
      )}
      {isConfirmDetailsOpen && (
        <div className={styles.divProduct} ref={boxRef}>
          <h2>Confirm Details</h2>
          <h3>
            Hey {name}! Please confirm your details Your Mobile Number: {mob}{" "}
            and Your order will be delivered on address: {add}
          </h3>
          <div className={styles.divPayment}>
            <h4>Please select Payment Option: </h4>

            <form>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="_cod"
                onChange={(e) => handlePaymentOption(e.target.value)}
              />
              <label htmlFor="cod">
                <strong>COD</strong>
              </label>
              <input
                type="radio"
                id="netBanking"
                name="payment"
                value="_netBanking"
                onChange={(e) => handlePaymentOption(e.target.value)}
              />
              <label htmlFor="netBanking">
                <strong>Net Banking</strong>
              </label>
            </form>
          </div>
          <Link to="/unknOrder" className={styles.linkPlaceOrder}>
            <h2
              className={styles.placeOrderBtn}
              onClick={() => handlePlaceOrder(guestUserData.paymentMode)}
            >
              Place Order
            </h2>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
