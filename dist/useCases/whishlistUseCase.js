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
exports.WishlistUseCase = void 0;
class WishlistUseCase {
    constructor(wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }
    getWishlistByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wishlistRepository.getWishlistByUserId(userId);
        });
    }
    addToWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wishlistRepository.addToWishlist(userId, productId);
            if (result === null) {
                return { status: 409, message: "Product already exists in the wishlist" };
            }
            return result;
        });
    }
    removeFromWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wishlistRepository.removeFromWishlist(userId, productId);
            if (result === null) {
                return { status: 404, message: "Wishlist or product not found" };
            }
            return result;
        });
    }
}
exports.WishlistUseCase = WishlistUseCase;
