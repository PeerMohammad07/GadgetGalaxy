import { Types } from "mongoose";
import { IWishlistRepository } from "../interfaces/Whishlist/WhishlistInterface";

export class WishlistUseCase {
  private wishlistRepository: IWishlistRepository;

  constructor(wishlistRepository: IWishlistRepository) {
    this.wishlistRepository = wishlistRepository;
  }

  async getWishlistByUserId(userId: Types.ObjectId) {
    return await this.wishlistRepository.getWishlistByUserId(userId);
  }

  async addToWishlist(userId: Types.ObjectId, productId: Types.ObjectId) {
    const result = await this.wishlistRepository.addToWishlist(userId, productId);
    if (result === null) {
      return { status: 409, message: "Product already exists in the wishlist" };
    }
    return result;
  }

  async removeFromWishlist(userId: Types.ObjectId, productId: Types.ObjectId) {
    const result = await this.wishlistRepository.removeFromWishlist(userId, productId);
    if (result === null) {
      return { status: 404, message: "Wishlist or product not found" };
    }
    return result;
  }
}
