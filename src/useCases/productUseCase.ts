import { Types } from "mongoose";
import { IProduct } from "../interfaces/Product/IProduct";
import cloudinary from "../infrastructure/utils/cloudinary";
import fs from "fs"
import { IProductUseCase } from "../interfaces/Product/IProductUseCase";
import { IProductRepository } from "../interfaces/Product/IProductRepository";


export class ProductUseCase implements IProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await this.productRepository.getAllProducts()
  }

  async addProduct(productData: IProduct): Promise<any> {
    try {
      const fileImage = await cloudinary.uploader.upload(productData.image.path,{
        folder : "GadgetGalaxy"
      })
  
      fs.unlinkSync(productData.image.path)
      productData["image"] = fileImage.secure_url
      console.log(productData)
      const newProduct = await this.productRepository.addProduct(productData)
      return newProduct
    } catch (error) {
      console.log(error)
    }
  }

  async editProduct(productId: Types.ObjectId, updateData: Partial<IProduct>): Promise<any | null> {
      return await this.productRepository.editProduct(productId,updateData)
  }

  async deleteProduct(productId: Types.ObjectId): Promise<IProduct | null> {
    return await this.productRepository.deleteProduct(productId);
  }
}
