import { Types } from "mongoose";
import { ICategory } from "./Category/ICategory";

// Define the interface for the Category Repository
export interface ICategoryRepository {
  getAllCategories(): Promise<ICategory[]>;
  addCategory(categoryData: ICategory): Promise<ICategory>;
  editCategory(categoryId: Types.ObjectId, updateData: Partial<ICategory>): Promise<ICategory | null>;
  deleteCategory(categoryId: Types.ObjectId): Promise<ICategory | null>;
}
