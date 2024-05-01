import styles from "./Navbar.module.css";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

function Navbar({ cartNav }) {
  return (
    <nav className={styles.navDiv}>
      <span className={styles.navSpanLogo}>
        <Logo />
      </span>
      <ul className={styles.navUl}>
        <li>
          <NavLink className={styles.liLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.liLink} to="/product">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.liLink} to="/signIn">
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.liLink} to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.liLink} to="/cart">
            Cart
          </NavLink>

          <img
            className={styles.liCart}
            src="./icons/shopping-cart.png"
            alt="Cart Icon"
          />
          <span>{cartNav}</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
