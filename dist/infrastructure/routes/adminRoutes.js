"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hashingService_1 = __importDefault(require("../utils/hashingService"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const adminController_1 = __importDefault(require("../../adapters/controllers/adminController"));
const adminRepository_1 = __importDefault(require("../../adapters/repository/adminRepository"));
const adminUseCase_1 = __importDefault(require("../../useCases/adminUseCase"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const categoryRepository_1 = require("../../adapters/repository/categoryRepository");
const categorySchema_1 = __importDefault(require("../model/categorySchema"));
const productRepository_1 = require("../../adapters/repository/productRepository");
const productSchema_1 = __importDefault(require("../model/productSchema"));
const productUseCase_1 = require("../../useCases/productUseCase");
const productController_1 = require("../../adapters/controllers/productController");
const multer_1 = require("../middlewares/multer");
const userUseCase_1 = __importDefault(require("../../useCases/userUseCase"));
const userRepository_1 = __importDefault(require("../../adapters/repository/userRepository"));
const categoryController_1 = require("../../adapters/controllers/categoryController");
const categoryUseCase_1 = require("../../useCases/categoryUseCase");
const userController_1 = __importDefault(require("../../adapters/controllers/userController"));
const orderSchema_1 = __importDefault(require("../model/orderSchema"));
const cartRepository_1 = require("../../adapters/repository/cartRepository");
const cartSchema_1 = __importDefault(require("../model/cartSchema"));
const adminRouter = express_1.default.Router();
const hashingService = new hashingService_1.default();
const jwtServiceInstance = new jwtService_1.default();
const cartRepository = new cartRepository_1.CartRepository(cartSchema_1.default);
const productRepository = new productRepository_1.ProductRepository(productSchema_1.default);
// User services
const UserRepository = new userRepository_1.default(userSchema_1.default, orderSchema_1.default);
const UserUseCase = new userUseCase_1.default(UserRepository, hashingService, jwtServiceInstance, cartRepository, productRepository);
const userController = new userController_1.default(UserUseCase);
// Admin services and controllers setup
const adminRepoInstance = new adminRepository_1.default(userSchema_1.default);
const adminUseCase = new adminUseCase_1.default(adminRepoInstance, hashingService, jwtServiceInstance);
const adminController = new adminController_1.default(adminUseCase, UserUseCase);
// Category services and controllers setup
const categoryRepository = new categoryRepository_1.CategoryRepository(categorySchema_1.default);
const categoryUseCase = new categoryUseCase_1.CategoryUseCase(categoryRepository);
const categoryController = new categoryController_1.CategoryController(categoryUseCase);
// Product services and controllers setup
const productUseCase = new productUseCase_1.ProductUseCase(productRepository);
const productController = new productController_1.ProductController(productUseCase);
// Admin routes
adminRouter.post('/login', adminController.login.bind(adminController));
adminRouter.post('/logout', adminController.logout.bind(adminController));
// Product routes
adminRouter.get("/products", productController.getAllProducts.bind(productController));
adminRouter.post("/product", multer_1.ImageUpload.single("image"), productController.addProduct.bind(productController));
adminRouter.patch("/products/:id", multer_1.ImageUpload.single("image"), productController.editProduct.bind(productController));
adminRouter.delete("/products/:id", productController.deleteProduct.bind(productController));
// // Category routes
adminRouter.get("/categories", categoryController.getAllCategories.bind(categoryController));
adminRouter.post("/categories", categoryController.addCategory.bind(categoryController));
adminRouter.patch("/categories/:id", categoryController.editCategory.bind(categoryController));
adminRouter.delete("/categories/:id", categoryController.deleteCategory.bind(categoryController));
// User routes
adminRouter.get("/getAllUsers", userController.getAllUsers);
exports.default = adminRouter;
