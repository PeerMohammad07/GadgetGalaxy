import { Model, Types } from "mongoose";
import { IProduct } from "../../interfaces/Product/IProduct";
import { IProductRepository } from "../../interfaces/Product/IProductRepository";

export class ProductRepository implements IProductRepository {
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>) {
    this.productModel = productModel;
  }

  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await this.productModel.find();
    } catch (error: any) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async addProduct(productData: IProduct): Promise<IProduct> {
    try {
      const newProduct = new this.productModel(productData);
      return await newProduct.save();
    } catch (error: any) {
      throw new Error(`Error adding product: ${error.message}`);
    }
  }

  async editProduct(productId: Types.ObjectId, updateData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        updateData,
        { new: true }
      );
      return updatedProduct;
    } catch (error: any) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(productId: Types.ObjectId): Promise<IProduct | null> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error: any) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async reduceProductQuantity(productId: string, quantity: number) {
    const quan = -Math.abs(Number(quantity));
    return await this.productModel.updateOne(
      { _id: productId },
      { $inc: { quantity: quan } }
    );
  }



  async getProductsByIds(productIds: string[]) {
    return await this.productModel.find({ _id: { $in: productIds } });
  }


}
