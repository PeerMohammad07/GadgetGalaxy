import { Model, Types } from "mongoose";
import { ICategoryRepository } from "../../interfaces/Category/ICategoryRepository";
import { ICategory } from "../../interfaces/Category/ICategory";

export class CategoryRepository implements ICategoryRepository {
  private categoryModel: Model<ICategory>;

  constructor(categoryModel: Model<ICategory>) {
    this.categoryModel = categoryModel;
  }

  // Get all categories
  async getAllCategories(): Promise<ICategory[]> {
    try {
      return await this.categoryModel.find();
    } catch (error: any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  // Add a category
  async addCategory(categoryData: ICategory): Promise<ICategory> {
    try {
      const newCategory = new this.categoryModel(categoryData);
      return await newCategory.save();
    } catch (error: any) {
      throw new Error(`Error adding category: ${error.message}`);
    }
  }

  // Edit a category
  async editCategory(categoryId: Types.ObjectId, updateData: Partial<ICategory>): Promise<ICategory | null> {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true } 
      );
      return updatedCategory;
    } catch (error: any) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  // Delete a category
  async deleteCategory(categoryId: Types.ObjectId): Promise<ICategory | null> {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
      return deletedCategory;
    } catch (error: any) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}
