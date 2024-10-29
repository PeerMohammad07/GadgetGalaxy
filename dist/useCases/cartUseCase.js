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
exports.CartUseCase = void 0;
class CartUseCase {
    constructor(cartRepository, ProductRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = ProductRepository;
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cartRepository.getCartByUserId(userId);
        });
    }
    addToCart(userId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.addToCart(userId, productData);
            if (cart === null) {
                return { status: 409, message: "Product already exists in the cart" };
            }
            return cart;
        });
    }
    removeFromCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cartRepository.removeFromCart(userId, productId);
        });
    }
    updateQuantity(type, cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.getCartById(cartId);
            if (!cart) {
                return { status: 404, message: "Cart not found" };
            }
            const productt = yield this.productRepository.getProductsByIds([productId]);
            const productIndex = cart.products.findIndex((product) => product.productId._id == productId);
            if (productIndex === -1) {
                return { status: 404, message: "Product not found in cart" };
            }
            const product = cart.products[productIndex];
            const currentQuantity = product.quantity;
            if (type === "inc") {
                if (currentQuantity < productt.quantity) {
                    product.quantity += 1;
                }
                else {
                    return { status: 400, message: "Maximum quantity reached" };
                }
            }
            else if (type === "dec") {
                if (currentQuantity > 1) {
                    product.quantity -= 1;
                }
                else {
                    return { status: 400, message: "Minimum quantity reached" };
                }
            }
            else {
                return { status: 400, message: "Invalid quantity type" };
            }
            cart.products[productIndex] = product;
            yield this.cartRepository.updateCart(cartId, cart);
            return { status: 200, cart };
        });
    }
}
exports.CartUseCase = CartUseCase;
