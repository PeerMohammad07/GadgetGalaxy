import { Types } from "mongoose";
import { ICartUseCase } from "../interfaces/Cart/ICartUseCase";
import { ICartRepository } from "../interfaces/Cart/ICartRepository";
import { ICart } from "../interfaces/Cart/ICart";
import { IProduct } from "../interfaces/Product/IProduct";
import { IProductRepository } from "../interfaces/Product/IProductRepository";


export class CartUseCase implements ICartUseCase {
  private cartRepository: ICartRepository;
  private productRepository : IProductRepository
  constructor(cartRepository: ICartRepository, ProductRepository : IProductRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = ProductRepository
  }

  async getCartByUserId(userId: Types.ObjectId): Promise<ICart | null> {
    return await this.cartRepository.getCartByUserId(userId);
  }

  async addToCart(userId: Types.ObjectId, productData: any): Promise<ICart | { status: number; message: string }> {
    const cart = await this.cartRepository.addToCart(userId, productData);
    if (cart === null) {
      return { status: 409, message: "Product already exists in the cart" };
    }
    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<ICart | null> {
    return await this.cartRepository.removeFromCart(userId, productId);
  }

  async updateQuantity(type: string, cartId: string, productId: string): Promise<{ status: number; message?: string; cart?: ICart }> {
    const cart = await this.cartRepository.getCartById(cartId);

    if (!cart) {
      return { status: 404, message: "Cart not found" };
    }


    const productt = await this.productRepository.getProductsByIds([productId])
    const productIndex = cart.products.findIndex((product: any) => product.productId._id == productId);
    if (productIndex === -1) {
      return { status: 404, message: "Product not found in cart" };
    }

    const product: any = cart.products[productIndex];
    const currentQuantity = product.quantity;

    if (type === "inc") {
      if (currentQuantity < productt.quantity) {
        product.quantity += 1;
      } else {
        return { status: 400, message: "Maximum quantity reached" };
      }
    } else if (type === "dec") {
      if (currentQuantity > 1) {
        product.quantity -= 1;
      } else {
        return { status: 400, message: "Minimum quantity reached" };
      }
    } else {
      return { status: 400, message: "Invalid quantity type" };
    }

    cart.products[productIndex] = product
    await this.cartRepository.updateCart(cartId, cart);
    return { status: 200, cart };
  }
}
