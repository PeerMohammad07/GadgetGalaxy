import { Types } from "mongoose";
import { ICategory, ICategoryData } from "../interfaces/Category/ICategory";
import { ICategoryRepository } from "../interfaces/Category/ICategoryRepository";
import { ICategoryUseCase } from "../interfaces/Category/ICategoryUseCase";


export class CategoryUseCase implements ICategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories(): Promise<ICategory[]> {
    return await this.categoryRepository.getAllCategories()
  }

  // Add a category
  async addCategory(categoryData: ICategoryData): Promise<ICategoryData> {
    return await this.categoryRepository.addCategory(categoryData);
  }

  // Edit a category
  async editCategory(categoryId: Types.ObjectId, updateData: Partial<ICategoryData>): Promise<ICategoryData | null> {
    return await this.categoryRepository.editCategory(categoryId, updateData);
  }

  // Delete a category
  async deleteCategory(categoryId: Types.ObjectId): Promise<ICategoryData | null> {
    return await this.categoryRepository.deleteCategory(categoryId);
  }
}
