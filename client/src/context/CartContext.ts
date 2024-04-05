import { createContext } from "react";
import { CartItem } from "../models/CartItem";

export interface ICartContext {
  cart: CartItem[],
  setCart: (items: CartItem[]) => void;
}

export const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
});
