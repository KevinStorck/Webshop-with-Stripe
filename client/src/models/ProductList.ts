import { Product } from "./Product";

export interface ProductList {
object: string,
url: string,
has_more: boolean,
data: Product[]
}