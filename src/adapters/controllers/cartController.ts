import { Request, Response } from "express";
import { HttpStatusEnum } from "../../statusCodeEnum";
import { Types } from "mongoose";
import { ICartUseCase } from "../../interfaces/Cart/ICartUseCase";

export class CartController {
  private cartUseCase: ICartUseCase;

  constructor(cartUseCase: ICartUseCase) {
    this.cartUseCase = cartUseCase;
  }

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const cart = await this.cartUseCase.getCartByUserId(userId);
      if (cart) {
        res.status(HttpStatusEnum.OK).json(cart);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Cart not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching cart: ${error.message}` });
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const { productId, quantity, productPrice } = req.body;
      const productData = {
        productId,
        quantity,
        productPrice,
        totalPrice: quantity * productPrice,
      };

      const result: any = await this.cartUseCase.addToCart(userId, productData);
      if (result.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(HttpStatusEnum.CREATED).json(result);
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding product to cart: ${error.message}` });
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
        const cartId = req.params.cartId as any
        const productId = req.params.productId as any
        const cart = await this.cartUseCase.removeFromCart(cartId, productId);
        console.log(cart)
        if (cart) {
            res.status(HttpStatusEnum.OK).json(cart);
        } else {
            res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Cart or product not found" });
        }
    } catch (error: any) {
        res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error removing product from cart: ${error.message}` });
    }
}


  async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const { type, cartId, productId } = req.body;
      const result = await this.cartUseCase.updateQuantity(type, cartId, productId);
      if (result.status) {
        res.status(HttpStatusEnum.OK).json(result);
      } else {
        res.status(result.status).json({ message: result.message });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating product quantity: ${error.message}` });
    }
  }
}
