import {Category} from "./category";
import {Supplier} from "./supplier";

export interface Product {
    id?: number,
    label?: string,
    description?: string,
    price?: number,
    category?: Category,
    supplier?: Supplier
}
