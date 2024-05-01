import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/homePage";
import ProductPage from "./pages/productsPage";
import SignInPage from "./pages/SignInPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import PageNotFound from "./pages/pageNotFound";
import options from "../public/Data/optionsProduct";
import GuestOrderPlaced from "./pages/GuestOrderPlaced";

function App() {
  const [cartNav, setCartNav] = useState(0);
  const [cart, setCart] = useState([]);
  const [guestUserData, setGuestUserData] = useState({});

  const [product, setProducts] = useState([]);

  useEffect(
    function () {
      async function getProducts() {
        const res = await fetch("https://fakestoreapi.com/products?limit=20");
        const data = await res.json();

        // Adding manual options from my optionsProduct.js
        const combinedData = data.map((prod) => {
          const option = options.filter((option) => option.id === prod.id);
          return {
            ...prod,
            options: option,
          };
        });
        //till here

        setProducts(combinedData);
        // console.log(combinedData);
      }

      getProducts();
    },
    [setProducts]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="product"
          element={
            <ProductPage
              product={product}
              setProducts={setProducts}
              cartNav={cartNav}
              setCartNav={setCartNav}
              setCart={setCart}
            />
          }
        />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="cart"
          element={
            <CartPage
              product={product}
              setProducts={setProducts}
              cartNav={cartNav}
              cart={cart}
              setCart={setCart}
              setCartNav={setCartNav}
              guestUserData={guestUserData}
              setGuestUserData={setGuestUserData}
            />
          }
        />
        <Route
          path="unknOrder"
          element={<GuestOrderPlaced guestUserData={guestUserData} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
