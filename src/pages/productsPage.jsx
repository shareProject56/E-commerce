import { useEffect, useState } from "react";

import Product from "../components/Product";
import Navbar from "../components/Navbar";
import options from "../../public/Data/optionsProduct";

function ProductPage({ cartNav, setCartNav, setCart, cart, product }) {
  return (
    <>
      <Navbar cartNav={cartNav} />
      {product.length <= 0 ? (
        <p>Loading the products....</p>
      ) : (
        <Product
          product={product}
          setCartNav={setCartNav}
          setCart={setCart}
          cart={cart}
        />
      )}
    </>
  );
}

export default ProductPage;
