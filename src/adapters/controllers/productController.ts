import { Request, Response } from "express";
import { IProductController } from "../../interfaces/Product/IProductController";
import { Types } from "mongoose";
import { HttpStatusEnum } from "../../statusCodeEnum";
import { IProductUseCase } from "../../interfaces/Product/IProductUseCase";

export class ProductController implements IProductController {
  private productUseCase: IProductUseCase;

  constructor(productUseCase: IProductUseCase) {
    this.productUseCase = productUseCase;
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productUseCase.getAllProducts();
      res.status(HttpStatusEnum.OK).json(products);
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching products: ${error.message}` });
    }
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const image:any = req.file
      const {data} = req.body;
      data["image"] = image
      const newProduct = await this.productUseCase.addProduct(data);
      res.status(HttpStatusEnum.CREATED).json(newProduct);
    } catch (error: any) {
      res.status(HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding product: ${error.message}` });
    }
  }

  async editProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id as unknown as Types.ObjectId;
      const updateData = req.body;
      console.log(updateData,productId)
      const updatedProduct = await this.productUseCase.editProduct(productId, updateData.data);
      if (updatedProduct) {
        res.status(HttpStatusEnum.OK).json(updatedProduct);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Product not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating product: ${error.message}` });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id as unknown as Types.ObjectId;
      const deletedProduct = await this.productUseCase.deleteProduct(productId);
      if (deletedProduct) {
        res.status(HttpStatusEnum.OK).json(deletedProduct);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Product not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error deleting product: ${error.message}` });
    }
  }
}
