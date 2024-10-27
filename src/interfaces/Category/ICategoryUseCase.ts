import { Types } from "mongoose";
import { ICategory, ICategoryData } from "./ICategory";

export interface ICategoryUseCase {
  getAllCategories():Promise<ICategory[]>;
  addCategory(categoryData: ICategoryData): Promise<ICategoryData>;
  editCategory(categoryId: Types.ObjectId, updateData: Partial<ICategoryData>): Promise<ICategoryData | null>;
  deleteCategory(categoryId: Types.ObjectId): Promise<ICategoryData | null>;
}
