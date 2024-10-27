import { Types } from "mongoose";
import { ICart } from "./ICart";
import { IProduct } from "../Product/IProduct";

export interface ICartRepository {
  getCartByUserId(userId: Types.ObjectId): Promise<ICart | null>;
  addToCart(userId: Types.ObjectId, productData: IProduct): Promise<ICart | null>;
  removeFromCart(cartId: string, productId: string): Promise<ICart | null>
  updateCart(cartId: string, updatedCart: ICart): Promise<ICart | null>
  getCartById(cartId: string): Promise<ICart | null>
  removeCartItems(userId:string):Promise<any>
}
