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
exports.CartRepository = void 0;
class CartRepository {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    getCartById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cartModel.findById(cartId).populate('products.productId');
        });
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cartModel.findOne({ userId }).populate('products.productId');
        });
    }
    updateCart(cartId, updatedCart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cartModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
        });
    }
    addToCart(userId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCartByUserId(userId);
            if (cart) {
                const existingProduct = cart.products.find((p) => p.productId._id == productData.productId);
                if (existingProduct) {
                    return null;
                }
                cart.products.push(Object.assign(Object.assign({}, productData), { totalPrice: productData.quantity * productData.productPrice }));
                return yield cart.save();
            }
            else {
                const newCart = new this.cartModel({
                    userId,
                    products: [Object.assign(Object.assign({}, productData), { totalPrice: productData.quantity * productData.productPrice })],
                });
                return yield newCart.save();
            }
        });
    }
    removeFromCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCartById(cartId);
            if (cart) {
                cart.products = cart.products.filter((product) => product.productId._id != productId);
                return yield cart.save();
            }
            return null;
        });
    }
    removeCartItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cartModel.findOneAndUpdate({ userId }, { products: [] }, { new: true });
        });
    }
}
exports.CartRepository = CartRepository;
