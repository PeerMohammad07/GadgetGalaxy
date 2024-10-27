import { Types } from "mongoose";
import { IProduct } from "./IProduct";

export interface IProductRepository {
  getAllProducts(): Promise<IProduct[]>;
  addProduct(productData: IProduct): Promise<IProduct>;
  editProduct(productId: Types.ObjectId, updateData: Partial<IProduct>): Promise<IProduct | null>;
  deleteProduct(productId: Types.ObjectId): Promise<IProduct | null>;
  reduceProductQuantity(productId: string, quantity: number):Promise<any>
  getProductsByIds(productIds: string[]):Promise<any>
}
