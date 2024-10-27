import { Types } from "mongoose";
import { Document } from "mongoose";

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: IProduct[];
}


export interface IWishlistUseCase {
  getWishlistByUserId(userId: Types.ObjectId): Promise<IWishlist | null>;
  addToWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null | { status: number; message: string }>;
  removeFromWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null | { status: number; message: string }>;
}

export interface IWishlistRepository {
  getWishlistByUserId(userId: Types.ObjectId): Promise<IWishlist | null>;
  addToWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null>;
  removeFromWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null>;
}


export interface IProduct {
  productId: Types.ObjectId;
}

