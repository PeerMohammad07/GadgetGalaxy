"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepository = void 0;
class WishlistRepository {
    constructor(wishlistModel) {
        this.wishlistModel = wishlistModel;
    }
    getWishlistByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wishlistModel.findOne({ userId }).populate('products.productId');
        });
    }
    addToWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield this.getWishlistByUserId(userId);
            console.log(wishlist);
            if (wishlist) {
                const existingProduct = wishlist.products.find(product => product.productId.equals(productId));
                if (existingProduct) {
                    return null;
                }
                wishlist.products.push({ productId });
                const savedWishlist = yield wishlist.save();
                return yield this.wishlistModel.findById(savedWishlist._id).populate('products.productId');
            }
            else {
                const newWishlist = new this.wishlistModel({
                    userId,
                    products: [{ productId }]
                });
                const savedWishlist = yield newWishlist.save();
                return yield this.wishlistModel.findById(savedWishlist._id).populate('products.productId');
            }
        });
    }
    removeFromWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield this.getWishlistByUserId(userId);
            if (wishlist) {
                wishlist.products = wishlist.products.filter(product => !product.productId.equals(productId));
                return yield wishlist.save();
            }
            return null;
        });
    }
}
exports.WishlistRepository = WishlistRepository;
