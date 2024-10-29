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
exports.ProductController = void 0;
const statusCodeEnum_1 = require("../../statusCodeEnum");
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productUseCase.getAllProducts();
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(products);
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching products: ${error.message}` });
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.file;
                const { data } = req.body;
                data["image"] = image;
                const newProduct = yield this.productUseCase.addProduct(data);
                res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json(newProduct);
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding product: ${error.message}` });
            }
        });
    }
    editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const updateData = req.body;
                console.log(updateData, productId);
                const updatedProduct = yield this.productUseCase.editProduct(productId, updateData.data);
                if (updatedProduct) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(updatedProduct);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating product: ${error.message}` });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const deletedProduct = yield this.productUseCase.deleteProduct(productId);
                if (deletedProduct) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(deletedProduct);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Product not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error deleting product: ${error.message}` });
            }
        });
    }
}
exports.ProductController = ProductController;
