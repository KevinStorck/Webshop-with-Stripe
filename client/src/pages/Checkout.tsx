import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { authorizeUser } from "../services/authServices";
import { ServicePoint } from "../models/ServicePoint";

export const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [discountName, setDiscountName] = useState("");
  const [adressInput, setAdressInput] = useState({
    adress: "",
    postalCode: "",
  });
  const [servicePoints, setServicePoints] = useState<ServicePoint[] | null>();
  const [servicePoint, setServicePoint] = useState<ServicePoint>();

  return (
    <>
      <div className="products">
        {cart.map((i) => (
          <div className="product" key={i.id}>
            <p>
              {i.name} - Total: {(i.unit_amount / 100) * i.quantity}{" "}
              {i.currency}
            </p>
            <p>Units: {i.quantity}</p>
            <img className="productImg" src={i.images[0]} alt={i.name} />
            <button
              onClick={() => {
                if (i.quantity <= 1)
                  return setCart(cart.filter((p) => p.id !== i.id));
                let newCart = cart.map((p) =>
                  p.id === i.id ? { ...p, quantity: p.quantity - 1 } : p
                );
                setCart(newCart);
              }}
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>
      {cart.length <= 0 ? <p>You have no products in your cart</p> : null}
      <input
        value={discountName}
        onChange={(e) => setDiscountName(e.target.value)}
        placeholder="Discount Code"
      />
      <input
        value={adressInput.adress}
        onChange={(e) =>
          setAdressInput({ ...adressInput, adress: e.target.value })
        }
        placeholder="Adress"
      />
      <input
        value={adressInput.postalCode}
        onChange={(e) =>
          setAdressInput({ ...adressInput, postalCode: e.target.value })
        }
        placeholder="Postal Code"
      />
      <button
        onClick={async () => {
          if (!adressInput.adress || !adressInput.postalCode) return;
          const response = await axios.post(
            "http://localhost:3000/api/postnord/delivery-adress",
            { adress: adressInput.adress, postalCode: adressInput.postalCode },
            { withCredentials: true }
          );

          setServicePoints(response.data);
        }}
      >
         Find Delivery Adress
      </button>
      {servicePoints ? (
        <div className="servicePoints">
          {" "}
          {servicePoints?.map((sp) => (
            <div
              key={sp.servicePointId}
              className={
                servicePoint?.servicePointId === sp.servicePointId
                  ? "servicePoint spActive"
                  : "servicePoint"
              }
              onClick={() => setServicePoint(sp)}
            >
              {sp.name}
              {", "}
              {sp.deliveryAddress.streetName} {sp.deliveryAddress.streetNumber}
            </div>
          ))}
        </div>
      ) : null}
      {servicePoint ? (
        <button
          onClick={async () => {
            if (!servicePoint) return;
            const isLoggedIn = await authorizeUser();
            if (!isLoggedIn) return;
            const response = await axios.post(
              "http://localhost:3000/api/stripe/checkout",
              {
                id: user?.id,
                cart: cart,
                coupon: discountName,
                servicePoint: servicePoint,
              },
              { withCredentials: true }
            );
            localStorage.setItem(
              "stripeSessionId",
              JSON.stringify(response.data.sessionId)
            );
            if (response.status === 200)
              window.location.href = response.data.url;
          }}
        >
          Köp
        </button>
      ) : null}
    </>
  );
};
