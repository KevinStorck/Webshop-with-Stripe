import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { User } from "../models/User";
import { useState } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { CartContext, ICartContext } from "../context/CartContext";
import { CartItem } from "../models/CartItem";

export const Layout = () => {
  const [user, setUser] = useState<IUserContext>({
    user: null,
    setUser: () => {},
  });
  user.setUser = (newUser: User | null = null) => {
    setUser({ ...user, user: newUser });
  };

  const [cart, setCart] = useState<ICartContext>({
    cart: [],
    setCart: () => {},
  });
  cart.setCart = (newCart: CartItem[]) => {
    setCart({ ...cart, cart: newCart });
  };

  return (
    <>
    <CartContext.Provider value={cart}>
    <UserContext.Provider value={user}>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      </UserContext.Provider>
      </CartContext.Provider>
    </>
  );
};
