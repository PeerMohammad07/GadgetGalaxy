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
exports.CartController = void 0;
const statusCodeEnum_1 = require("../../statusCodeEnum");
class CartController {
    constructor(cartUseCase) {
        this.cartUseCase = cartUseCase;
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const cart = yield this.cartUseCase.getCartByUserId(userId);
                if (cart) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(cart);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Cart not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching cart: ${error.message}` });
            }
        });
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { productId, quantity, productPrice } = req.body;
                const productData = {
                    productId,
                    quantity,
                    productPrice,
                    totalPrice: quantity * productPrice,
                };
                const result = yield this.cartUseCase.addToCart(userId, productData);
                if (result.status) {
                    res.status(result.status).json({ message: result.message });
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json(result);
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding product to cart: ${error.message}` });
            }
        });
    }
    removeFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = req.params.cartId;
                const productId = req.params.productId;
                const cart = yield this.cartUseCase.removeFromCart(cartId, productId);
                console.log(cart);
                if (cart) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(cart);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Cart or product not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error removing product from cart: ${error.message}` });
            }
        });
    }
    updateQuantity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, cartId, productId } = req.body;
                const result = yield this.cartUseCase.updateQuantity(type, cartId, productId);
                if (result.status) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(result);
                }
                else {
                    res.status(result.status).json({ message: result.message });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating product quantity: ${error.message}` });
            }
        });
    }
}
exports.CartController = CartController;
