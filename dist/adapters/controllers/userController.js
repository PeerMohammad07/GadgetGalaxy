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
const statusCodeEnum_1 = require("../../statusCodeEnum");
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const response = yield this.userUseCase.register({ name, email, password });
                if (!response.status) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.CONFLICT).json(response);
                    return;
                }
                res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
                res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.userUseCase.login(email, password);
                if (!(response === null || response === void 0 ? void 0 : response.status)) {
                    if (response.message.email) {
                        res.status(404).json(response);
                        return;
                    }
                    else if (response.message.password) {
                        res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json(response);
                        return;
                    }
                }
                res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
                res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
                res.status(200).json({ status: true, message: response.message, data: response.data.user });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("userToken", "", { maxAge: 0 });
                res.cookie("userRefreshToken", "", { maxAge: 0 });
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({ status: true, message: "User logout successfully" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userUseCase.getAllUsers();
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(users);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const addressData = req.body;
                const result = yield this.userUseCase.addAddress(userId, addressData);
                if (result.status) {
                    res.status(result.status).json({ message: result.message });
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json(result);
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding address: ${error.message}` });
            }
        });
    }
    placeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderDetails } = req.body;
                const response = yield this.userUseCase.placeOrder(orderDetails);
                console.log(response);
                if (!response.status) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json({
                        message: response.message || "Failed to place order"
                    });
                    return;
                }
                res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json({
                    message: "Order placed successfully",
                    data: response
                });
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                    message: `Error placing order: ${error.message}`
                });
            }
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const response = yield this.userUseCase.getAllOrders(userId);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                    message: `Error getting order: ${error.message}`
                });
            }
        });
    }
}
exports.default = UserController;
