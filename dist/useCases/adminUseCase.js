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
class AdminUseCase {
    constructor(adminRepository, hashingService, jwtService) {
        this.adminRepository = adminRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.checkAdminExists(email);
            if (!admin) {
                return {
                    status: false,
                    message: {
                        email: "Admin Not Found"
                    }
                };
            }
            const status = yield this.hashingService.compare(password, admin.password);
            if (!status) {
                return {
                    status: false,
                    message: {
                        password: "Incorrect Password"
                    }
                };
            }
            const payload = { id: admin._id, name: admin.name, isAdmin: admin.isAdmin };
            const token = this.jwtService.generateToken(payload);
            const refreshToken = this.jwtService.generateRefreshToken(payload);
            return {
                status: true,
                message: "Admin Login Successfully",
                data: { token, refreshToken, admin }
            };
        });
    }
}
exports.default = AdminUseCase;
