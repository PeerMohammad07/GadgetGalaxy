import { Types } from "mongoose";
import { ICart } from "./ICart";
import { IProduct } from "../Product/IProduct";

export interface ICartUseCase {
  updateQuantity(type: string, cartId: string, productId: string): Promise<{ status: number; message?: string; cart?: ICart }>
  getCartByUserId(userId: Types.ObjectId): Promise<ICart | null>;
  addToCart(userId: Types.ObjectId, productData: any): Promise<ICart | { status: number; message: string }>;
  removeFromCart(userId: string, productId: string): Promise<ICart | null>
}
