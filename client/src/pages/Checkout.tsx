import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  return (
    <>
      {cart.map((i) => (
        <div className="product" key={i.id}>
          <p>
            {i.name} - Total: {(i.unit_amount / 100) * i.quantity}
            {i.currency}
          </p>
          <img className="productImg" src={i.images[0]} alt={i.name} />
          <button onClick={() => {
            if (i.quantity <= 1) return setCart(cart.filter(p => p.id !== i.id))     
            let newCart = cart.map(p => p.id === i.id ? {...p, quantity: p.quantity-1} : p)
            setCart(newCart)
          }}>Ta bort</button>
        </div>
      ))}
      <button onClick={async () => {}}>Köp</button>
    </>
  );
};
