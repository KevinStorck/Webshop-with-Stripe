import { useContext, useEffect, useState } from "react";
import { ProductList } from "../models/ProductList";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export const Products = () => {
  const {cart, setCart} = useContext(CartContext)
  const [products, setProducts] = useState<ProductList>();
  useEffect(() => {
    if (products) return;
    const fetchProducts = async () => {
      const response = await axios.get<ProductList>(
        "http://localhost:3000/api/stripe/products",
        { withCredentials: true }
      );
      setProducts(response.data);
    };
    fetchProducts();
  });
  
  return (
    <div className="products">
      {products?.data.map((p) => (
        <div className="product" key={p.id}>
          <div>
          <p>{p.name} - {p.default_price?.unit_amount / 100} {p.default_price.currency}</p>
          <button onClick={() => {
            const cartItem = cart.find(i => i.id === p.default_price.id)
            if (cartItem) {
              let newCart = cart.map(i => i.id === p.default_price.id ? {...i, quantity: i.quantity+1} : i)
              setCart(newCart)
            } else {
            setCart([...cart, {
              id: p.default_price.id,
              name: p.name,
              quantity: 1,
              images: p.images,
              currency: p.default_price.currency,
              type: p.default_price.type,
              unit_amount: p.default_price.unit_amount
            }])}
          }}>Add to Cart</button>
          </div>
          <img className="productImg" src={p.images[0]} alt={p.name}/>
        </div>
      ))}
    </div>
  );
};
