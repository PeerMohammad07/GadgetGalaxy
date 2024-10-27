import express from "express";
import HashingService from "../utils/hashingService";
import jwtService from "../utils/jwtService";
import AdminController from "../../adapters/controllers/adminController";
import adminRepository from "../../adapters/repository/adminRepository";
import AdminUseCase from "../../useCases/adminUseCase";
import User from "../model/userSchema";
import { CategoryRepository } from "../../adapters/repository/categoryRepository";
import Category from "../model/categorySchema";
import { ProductRepository } from "../../adapters/repository/productRepository";
import Product from "../model/productSchema";
import { ProductUseCase } from "../../useCases/productUseCase";
import { ProductController } from "../../adapters/controllers/productController";
import { ImageUpload } from "../middlewares/multer";
import userUseCase from "../../useCases/userUseCase";
import userRepository from "../../adapters/repository/userRepository";
import { CategoryController } from "../../adapters/controllers/categoryController";
import { CategoryUseCase } from "../../useCases/categoryUseCase";
import UserController from "../../adapters/controllers/userController";
import OrderSchema from "../model/orderSchema";
import { CartRepository } from "../../adapters/repository/cartRepository";
import Cart from "../model/cartSchema";

const adminRouter = express.Router();


const hashingService = new HashingService();
const jwtServiceInstance = new jwtService();
const cartRepository = new CartRepository(Cart);
const productRepository = new ProductRepository(Product)

// User services
const UserRepository = new userRepository(User,OrderSchema)
const UserUseCase = new userUseCase(UserRepository,hashingService,jwtServiceInstance,cartRepository,productRepository)
const userController = new UserController(UserUseCase)

// Admin services and controllers setup
const adminRepoInstance = new adminRepository(User);
const adminUseCase = new AdminUseCase(adminRepoInstance, hashingService, jwtServiceInstance);
const adminController = new AdminController(adminUseCase,UserUseCase);

// Category services and controllers setup
const categoryRepository = new CategoryRepository(Category);
const categoryUseCase = new CategoryUseCase(categoryRepository)
const categoryController = new CategoryController(categoryUseCase);

// Product services and controllers setup
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

// Admin routes
adminRouter.post('/login', adminController.login.bind(adminController));
adminRouter.post('/logout', adminController.logout.bind(adminController));

// Product routes
adminRouter.get("/products",productController.getAllProducts.bind(productController));
adminRouter.post("/product",ImageUpload.single("image"),productController.addProduct.bind(productController));
adminRouter.patch("/products/:id",ImageUpload.single("image"),productController.editProduct.bind(productController)); 
adminRouter.delete("/products/:id", productController.deleteProduct.bind(productController));

// // Category routes
adminRouter.get("/categories", categoryController.getAllCategories.bind(categoryController)); 
adminRouter.post("/categories", categoryController.addCategory.bind(categoryController)); 
adminRouter.patch("/categories/:id", categoryController.editCategory.bind(categoryController)); 
adminRouter.delete("/categories/:id", categoryController.deleteCategory.bind(categoryController)); 

// User routes
adminRouter.get("/getAllUsers",userController.getAllUsers)

export default adminRouter;
