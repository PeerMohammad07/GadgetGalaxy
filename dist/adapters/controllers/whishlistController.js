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
exports.WishlistController = void 0;
const statusCodeEnum_1 = require("../../statusCodeEnum");
class WishlistController {
    constructor(wishlistUseCase) {
        this.wishlistUseCase = wishlistUseCase;
    }
    getWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const wishlist = yield this.wishlistUseCase.getWishlistByUserId(userId);
                if (wishlist) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(wishlist);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Wishlist not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching wishlist: ${error.message}` });
            }
        });
    }
    addToWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const productId = req.body.productId;
                const result = yield this.wishlistUseCase.addToWishlist(userId, productId);
                console.log(result, "brooo");
                if (result.status) {
                    res.status(result.status).json({ message: result.message });
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json(result);
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error adding product to wishlist: ${error.message}` });
            }
        });
    }
    removeFromWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const productId = req.params.productId;
                const result = yield this.wishlistUseCase.removeFromWishlist(userId, productId);
                if (result.status) {
                    res.status(result.status).json({ message: result.message });
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(result);
                }
            }
            catch (error) {
                console.log(error);
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error removing product from wishlist: ${error.message}` });
            }
        });
    }
}
exports.WishlistController = WishlistController;
