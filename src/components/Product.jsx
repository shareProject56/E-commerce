import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { useState } from "react";

function Product({ product, setCartNav, setCart }) {
  console.log(product);
  const [sortString, setSortString] = useState("normal");
  const [categoriesString, setCategoriesString] = useState("normal");

  const [sort, setSort] = useState(product);

  function handleAddToCart(id) {
    const addedProduct = product.filter((el) => el.id === id);
    if (addedProduct[0].options[0].isAddedToCart) {
      alert("Item is already added to the cart");
      return;
    }
    setCartNav((cur) => cur + 1);
    addedProduct[0].options[0].isAddedToCart = true;
    setCart((cur) => [...cur, ...addedProduct]);
  }

  function handleBuyNow(id) {
    const addedProduct = product.filter((el) => el.id === id);
    if (addedProduct[0].options[0].isAddedToCart) return;
    setCartNav((cur) => cur + 1);
    addedProduct[0].options[0].isAddedToCart = true;
    setCart((cur) => [...cur, ...addedProduct]);
  }

  function handleSort(val) {
    setSortString(val);
    if (val === "normal") {
      setSort(product);
    }
    if (val === "highToLow") {
      setSort((cur) => {
        const a = cur.slice().sort((a, b) => b.price - a.price);
        console.log(a);
        return a;
      });
    }
    if (val === "lowToHigh") {
      setSort((cur) => {
        const a = cur.slice().sort((a, b) => a.price - b.price);
        console.log(a);
        return a;
      });
    }
  }

  function handleCategory(val) {
    setCategoriesString(val);
    if (val === "normal") {
      setSort(product);
    }
    if (val === "electronics") {
      setSort(() => product.filter((el) => el.category === "electronics"));
    }
    if (val === "jewelery") {
      setSort(() => product.filter((el) => el.category === "jewelery"));
    }
    if (val === "women's clothing") {
      setSort(() => product.filter((el) => el.category === "women's clothing"));
    }
    if (val === "men's clothing") {
      setSort(() => product.filter((el) => el.category === "men's clothing"));
    }
  }
  return (
    <>
      <div className={styles.divProductHead}>
        <div className={styles.divCategory}>
          <h3>Categories: </h3>
          <select
            value={categoriesString}
            className={styles.selectSort}
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option value="normal">All Products</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="men's clothing">Men's Clothing</option>
          </select>
        </div>

        <select
          className={styles.selectSort}
          value={sortString}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="normal">All Items</option>
          <option value="highToLow">Price High to Low</option>
          <option value="lowToHigh">Price Low to High</option>
        </select>
      </div>
      <div className={styles.divProduct}>
        {sort.map((product) => (
          <div className={styles.divInsideProduct} key={product.id}>
            <h1>{product.title}</h1>
            <img
              className={styles.productImage}
              src={product.image}
              alt="Product Image"
            />
            <h3>₹{product.price}</h3>
            <p>{product.description}</p>
            {product.options?.map((opt, i) => (
              <div className={styles.divOptions} key={opt.id}>
                <ul className={styles.ulOptions}>
                  Color:
                  <li>{opt.color[i]}</li>
                  <li>{opt.color[i + 1]}</li>
                  <li>{opt.color[i + 2]}</li>
                </ul>
                <ul className={styles.ulSizeOptions}>
                  Size:
                  <li>{opt.size[i]}</li>
                  <li>{opt.size[i + 1]}</li>
                  <li>{opt.size[i + 2]}</li>
                  <li>{opt.size[i + 3]}</li>
                </ul>
              </div>
            ))}
            <div className={styles.divCartBuy}>
              <button onClick={() => handleAddToCart(product.id)}>
                {product.options[0].isAddedToCart
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
              <Link to="/cart">
                <button onClick={() => handleBuyNow(product.id)}>
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Product;
