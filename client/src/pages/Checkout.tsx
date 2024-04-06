import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { authorizeUser } from "../services/authServices";

export const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const {user} = useContext(UserContext)
  const [discountName, setDiscountName] = useState("")
  
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
      {cart.length <= 0 ? <p>Du har inga produkter i din varukorg</p> : <button onClick={async () => {
        const isLoggedIn = await authorizeUser()
        if (!isLoggedIn) return
        const response = await axios.post("http://localhost:3000/api/stripe/checkout", {id: user?.id, cart: cart, coupon: discountName}, {withCredentials: true})
        localStorage.setItem("stripeSessionId", JSON.stringify(response.data.sessionId))
        if (response.status === 200) window.location.href = response.data.url
        }}>Köp</button>}
        <input value={discountName} onChange={(e)=> setDiscountName(e.target.value)} placeholder="Discount Code"></input>
    </>
  );
};
