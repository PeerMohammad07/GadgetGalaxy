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
    console.log(wishlist)
    if (wishlist) {
      const existingProduct = wishlist.products.find(product => product.productId.equals(productId));
      if (existingProduct) {
        return null; 
      }
      wishlist.products.push({ productId });
      const savedWishlist = await wishlist.save();
      return await this.wishlistModel.findById(savedWishlist._id).populate('products.productId');
    } else {
      const newWishlist = new this.wishlistModel({
        userId,
        products: [{ productId }]
      });
       const savedWishlist = await newWishlist.save();
       return await this.wishlistModel.findById(savedWishlist._id).populate('products.productId');

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
