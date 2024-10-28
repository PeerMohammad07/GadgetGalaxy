import { Types } from "mongoose";
import { IProduct } from "./IProduct";

export interface IProductUseCase {
  getAllProducts(): Promise<IProduct[]>;
  addProduct(productData: IProduct): Promise<IProduct>;
  editProduct(productId: Types.ObjectId, updateData: Partial<IProduct>): Promise<IProduct | null>;
  deleteProduct(productId: Types.ObjectId): Promise<IProduct | null>;
}
