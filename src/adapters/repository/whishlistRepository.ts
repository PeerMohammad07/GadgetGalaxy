import { Model, Types } from "mongoose";
import { IWishlist } from "../../interfaces/Whishlist/WhishlistInterface";

export class WishlistRepository {
  private wishlistModel: Model<IWishlist>;

  constructor(wishlistModel: Model<IWishlist>) {
    this.wishlistModel = wishlistModel;
  }

  async getWishlistByUserId(userId: Types.ObjectId): Promise<IWishlist | null> {
    return await this.wishlistModel.findOne({ userId }).populate('products.productId');
  }

  async addToWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null> {
    const wishlist = await this.getWishlistByUserId(userId);
    if (wishlist) {
      // Check if the product is already in the wishlist
      const existingProduct = wishlist.products.find(product => product.productId.equals(productId));
      if (existingProduct) {
        return null; // Product already in wishlist
      }
      wishlist.products.push({ productId });
      return await wishlist.save();
    } else {
      const newWishlist = new this.wishlistModel({
        userId,
        products: [{ productId }]
      });
      return await newWishlist.save();
    }
  }

  async removeFromWishlist(userId: Types.ObjectId, productId: Types.ObjectId): Promise<IWishlist | null> {
    const wishlist = await this.getWishlistByUserId(userId);
    if (wishlist) {
      wishlist.products = wishlist.products.filter(product => !product.productId.equals(productId));
      return await wishlist.save();
    }
    return null;
  }
}
