// routes/adminRouter.ts
import express from "express";
import HashingService from "../utils/hashingService";
import jwtService from "../utils/jwtService";
import AdminController from "../../adapters/controllers/adminController";
import adminRepository from "../../adapters/repository/adminRepository";
import AdminUseCase from "../../useCases/adminUseCase";
import User from "../model/userSchema";

const adminRouter = express.Router();

const hashingService = new HashingService();
const JwtService = new jwtService();
const AdminRepository = new adminRepository(User);
const adminUseCase = new AdminUseCase(AdminRepository, hashingService, JwtService);
const adminController = new AdminController(adminUseCase);

adminRouter.post('/login', adminController.login);
adminRouter.post('/logout', adminController.logout);

export default adminRouter;
