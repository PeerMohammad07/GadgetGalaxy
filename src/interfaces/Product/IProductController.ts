import { Request, Response } from "express";

export interface IProductController {
  getAllProducts(req: Request, res: Response): Promise<void>;
  addProduct(req: Request, res: Response): Promise<void>;
  editProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
}
