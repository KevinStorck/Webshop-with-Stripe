import { default_price } from "./Product";

export interface CartItem extends default_price {
    quantity: number,
    name: string,
    images: string[]
}