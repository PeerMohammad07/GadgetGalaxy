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
class userUseCase {
    constructor(userRepository, hashingService, jwtService, CartRepository, ProductRepository) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.cartRepository = CartRepository;
        this.productRepository = ProductRepository;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.userRepository.checkUserExists(data.email);
            if (userExists) {
                return {
                    status: false,
                    message: {
                        email: "User already exists with this email"
                    }
                };
            }
            if (data.password) {
                data.password = yield this.hashingService.hashing(data.password);
            }
            const user = yield this.userRepository.createUser(data.name, data.email, data.password);
            if (user) {
                return {
                    status: true,
                    message: "User created successfully",
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                };
            }
            const payload = { id: user._id, name: user.name, isAdmin: user.isAdmin };
            const token = this.jwtService.generateToken(payload);
            const refreshToken = this.jwtService.generateRefreshToken(payload);
            return {
                status: false,
                data: { token, refreshToken, user },
                message: "Failed to register",
            };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.checkUserExists(email);
            if (!user) {
                return {
                    status: false,
                    message: {
                        email: "User Not Found"
                    }
                };
            }
            const status = yield this.hashingService.compare(password, user.password);
            if (!status) {
                return {
                    status: false,
                    message: {
                        password: "Incorrect Password"
                    }
                };
            }
            const payload = { id: user._id, name: user.name };
            const token = this.jwtService.generateToken(payload);
            const refreshToken = this.jwtService.generateRefreshToken(payload);
            return {
                status: true,
                message: "User Login Succesfully",
                data: { token, refreshToken, user }
            };
        });
    }
    addAddress(userId, addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.addAddress(userId, addressData.address);
            if (!result) {
                return { status: 409, message: "Failed to add address" };
            }
            return result;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAllUser();
        });
    }
    placeOrder(orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productIds = orderDetails.products.map((product) => product.productId);
                const products = yield this.productRepository.getProductsByIds(productIds);
                for (const orderProduct of orderDetails.products) {
                    const product = products.find((p) => p._id.toString() === orderProduct.productId);
                    if (!product) {
                        return { status: false, message: `Product with ID ${orderProduct.productId} not found` };
                    }
                    if (product.quantity < orderProduct.quantity) {
                        return { status: false, message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${orderProduct.quantity}` };
                    }
                }
                orderDetails.products.forEach((product) => {
                    product.quantity = Number(product.quantity);
                });
                const response = yield this.userRepository.saveOrder(orderDetails);
                if (response) {
                    yield this.cartRepository.removeCartItems(orderDetails.userId);
                    return response;
                }
                else {
                    return { status: false, message: "Failed to place order" };
                }
            }
            catch (error) {
                console.error("Error placing order:", error);
                return { status: false, message: "An error occurred while placing the order." };
            }
        });
    }
    getAllOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAllOrders(userId);
        });
    }
}
exports.default = userUseCase;
