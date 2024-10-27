import { Request, Response } from "express";
import { ObjectId, Types } from "mongoose";
import { IProduct } from "../Product/IProduct";

export interface ICart extends Document {
  userId: ObjectId;   
  products: IProduct[];  
}

export interface Product {
  productId: ObjectId;  
  quantity: number;      
  productPrice: number; 
  totalPrice: number;  
}

export interface ICartData {
  userId: ObjectId;      
  products: Product[];   
}

