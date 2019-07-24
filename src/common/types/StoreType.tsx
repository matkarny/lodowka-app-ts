import { IProduct } from "../interfaces/Product";
import INote from "../interfaces/Notes";

export type StoreType = {
    notes: INote[],
    products: IProduct[]
}

export default StoreType 

// type PartialStore = Pick<StoreType, 'products'>

// let x:PartialStore;
// x.products[0].expirationDate