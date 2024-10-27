import { Request, Response } from "express";
import { ICategoryController } from "../../interfaces/Category/ICategoryController";
import { Types } from "mongoose";
import { ICategoryUseCase } from "../../interfaces/Category/ICategoryUseCase";
import { HttpStatusEnum } from "../../statusCodeEnum";

export class CategoryController implements ICategoryController {
  private categoryUseCase: ICategoryUseCase;

  constructor(categoryUseCase: ICategoryUseCase) {
    this.categoryUseCase = categoryUseCase;
  }

  // Get all categories
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryUseCase.getAllCategories();
      res.status(HttpStatusEnum.OK).json(categories);
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching categories: ${error.message}` });
    }
  }

  // Add a new category
  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const {data } = req.body;
      const {name,description} = data
      const newCategory = await this.categoryUseCase.addCategory({ name, description });
      res.status(HttpStatusEnum.CREATED).json(newCategory);
    } catch (error: any) {
      res.status(HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding category: ${error.message}` });
    }
  }

  // Edit an existing category
  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.params.id as unknown as Types.ObjectId;
      const { name, description } = req.body;
      const updatedCategory = await this.categoryUseCase.editCategory(categoryId, { name, description });

      if (updatedCategory) {
        res.status(HttpStatusEnum.OK).json(updatedCategory);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Category not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating category: ${error.message}` });
    }
  }

  // Delete a category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.params.id as unknown as Types.ObjectId;
      const deletedCategory = await this.categoryUseCase.deleteCategory(categoryId);

      if (deletedCategory) {
        res.status(HttpStatusEnum.OK).json(deletedCategory);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Category not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error deleting category: ${error.message}` });
    }
  }
}
