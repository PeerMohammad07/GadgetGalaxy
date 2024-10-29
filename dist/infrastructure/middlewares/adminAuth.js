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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const userAuth_1 = require("./userAuth");
const JwtService = new jwtService_1.default();
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.adminRefreshToken;
    let adminToken = req.cookies.adminToken;
    if (!refreshToken) {
        return res.status(401).json({ status: false, message: "Not authorized" });
    }
    if (!adminToken || adminToken === "" || Object.keys(adminToken).length === 0) {
        try {
            const newAdminToken = yield (0, userAuth_1.refreshAccessToken)(refreshToken);
            res.cookie("adminToken", newAdminToken, {
                httpOnly: true,
                maxAge: 3600000,
                secure: process.env.NODE_ENV !== "production",
            });
            adminToken = newAdminToken;
        }
        catch (error) {
            return res.status(401).json({ message: "Failed to refresh access token" });
        }
    }
    try {
        const decoded = yield JwtService.verifyToken(adminToken);
        if (!decoded || decoded.role !== "admin") {
            return res.status(403).json({ status: false, message: "Admin access denied" });
        }
        const admin = yield userSchema_1.default.findOne({ _id: decoded.id, role: "admin" });
        if (!admin) {
            return res.status(401).json({ status: false, message: "Not Authorized, Admin not found" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ status: false, message: "Not authorized, invalid token" });
    }
});
exports.default = adminAuth;
