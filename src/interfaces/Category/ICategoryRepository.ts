import { Types } from "mongoose";
import { ICategory } from "./ICategory";
 
// Define the interface for the Category Repository
export interface ICategoryRepository {
  getAllCategories(): Promise<ICategory[]>;
  addCategory(categoryData: any): Promise<ICategory>;
  editCategory(categoryId: Types.ObjectId, updateData: Partial<ICategory>): Promise<ICategory | null>;
  deleteCategory(categoryId: Types.ObjectId): Promise<ICategory | null>;
}
