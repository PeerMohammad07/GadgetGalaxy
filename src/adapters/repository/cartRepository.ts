import { Model, Types } from "mongoose";
import { ICart } from "../../interfaces/Cart/ICart";
import { IProduct } from "../../interfaces/Product/IProduct";
import { ICartRepository } from "../../interfaces/Cart/ICartRepository";


export class CartRepository implements ICartRepository {
  private cartModel: Model<ICart>;

  constructor(cartModel: Model<ICart>) {
    this.cartModel = cartModel;
  }

  async getCartById(cartId: string): Promise<ICart | null> {
    return await this.cartModel.findById(cartId).populate('products.productId');
  }

  async getCartByUserId(userId: Types.ObjectId): Promise<ICart | null> {
    return await this.cartModel.findOne({ userId }).populate('products.productId');
  }

  async updateCart(cartId: string, updatedCart: ICart): Promise<ICart | null> {
    return await this.cartModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
  }

  async addToCart(userId: Types.ObjectId, productData: any): Promise<any | null> {
    const cart: any = await this.getCartByUserId(userId);
    if (cart) {
      const existingProduct = cart.products.find((p: any) => p.productId._id == productData.productId);
      if (existingProduct) {
        return null;
      }

      cart.products.push({
        ...productData,
        totalPrice: productData.quantity * productData.productPrice,
      });

      return await cart.save();
    } else {
      const newCart = new this.cartModel({
        userId,
        products: [{
          ...productData,
          totalPrice: productData.quantity * productData.productPrice,
        }],
      });
      return await newCart.save();
    }
  }

  async removeFromCart(cartId: string, productId: string): Promise<ICart | null> {
    const cart:any = await this.getCartById(cartId);
    if (cart) {
      cart.products = cart.products.filter((product:any) => product.productId._id != productId);
      return await cart.save();
    }
    return null;
  }

  async removeCartItems(userId:string){
    await this.cartModel.findOneAndUpdate(
      { userId }, 
      { products: [] }, 
      { new: true } 
    );
  }

}
