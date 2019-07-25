
import { IProduct } from '../interfaces/Product';
import { INote } from '../interfaces/Notes';
import { IUser } from '../interfaces/Users';

export type StoreType = {
  notes: INote[];
  products: IProduct[];
  users: IUser[];
  auth: [];
};

export default StoreType;

// type PartialStore = Pick<StoreType, 'products'>

// let x:PartialStore;
// x.products[0].expirationDate
