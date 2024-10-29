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
class AdminController {
    constructor(adminUseCase, userUseCase) {
        this.adminUseCase = adminUseCase;
        this.userUseCase = userUseCase;
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.adminUseCase.login(email, password);
                if (!(response === null || response === void 0 ? void 0 : response.status)) {
                    if (response === null || response === void 0 ? void 0 : response.message.email) {
                        res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json(response);
                        return;
                    }
                    else if (response === null || response === void 0 ? void 0 : response.message.password) {
                        res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json(response);
                        return;
                    }
                }
                res.cookie("adminToken", response === null || response === void 0 ? void 0 : response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV != "development" });
                res.cookie("adminRefreshToken", response === null || response === void 0 ? void 0 : response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV != "development" });
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({ status: true, message: response === null || response === void 0 ? void 0 : response.message, data: response === null || response === void 0 ? void 0 : response.data.admin });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("adminToken", "");
                res.cookie("adminRefreshToken", "");
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({ status: true, message: "Admin logout successfully" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUseCase.getAllUsers();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AdminController;
