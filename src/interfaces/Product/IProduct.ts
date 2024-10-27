import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  name: string;
  quantity: string;
  price: number;
  image: any;
  description: string;
  category: ObjectId;
}
