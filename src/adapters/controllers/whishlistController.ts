import { Request, Response } from "express";
import { HttpStatusEnum } from "../../statusCodeEnum";
import { Types } from "mongoose";
import { IWishlistUseCase } from "../../interfaces/Whishlist/WhishlistInterface";

export class WishlistController {
  private wishlistUseCase: IWishlistUseCase;

  constructor(wishlistUseCase: IWishlistUseCase) {
    this.wishlistUseCase = wishlistUseCase;
  }

  async getWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const wishlist = await this.wishlistUseCase.getWishlistByUserId(userId);
      if (wishlist) {
        res.status(HttpStatusEnum.OK).json(wishlist);
      } else {
        res.status(HttpStatusEnum.NOT_FOUND).json({ message: "Wishlist not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching wishlist: ${error.message}` });
    }
  }

  async addToWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const productId = req.body.productId as Types.ObjectId;

      const result:any = await this.wishlistUseCase.addToWishlist(userId, productId);
      if (result.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(HttpStatusEnum.CREATED).json(result);
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error adding product to wishlist: ${error.message}` });
    }
  }

  async removeFromWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const productId = req.params.productId as unknown as Types.ObjectId;

      const result:any = await this.wishlistUseCase.removeFromWishlist(userId, productId);
      if (result.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(HttpStatusEnum.OK).json(result);
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error removing product from wishlist: ${error.message}` });
    }
  }
}
