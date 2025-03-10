import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
}

export interface ICategoryData {
  _id?: string;
  name: string;
  description: string;
}
