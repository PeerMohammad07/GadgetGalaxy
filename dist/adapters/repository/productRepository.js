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
exports.ProductRepository = void 0;
class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productModel.find();
            }
            catch (error) {
                throw new Error(`Error fetching products: ${error.message}`);
            }
        });
    }
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new this.productModel(productData);
                return yield newProduct.save();
            }
            catch (error) {
                throw new Error(`Error adding product: ${error.message}`);
            }
        });
    }
    editProduct(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.productModel.findByIdAndUpdate(productId, updateData, { new: true });
                return updatedProduct;
            }
            catch (error) {
                throw new Error(`Error updating product: ${error.message}`);
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedProduct = yield this.productModel.findByIdAndDelete(productId);
                return deletedProduct;
            }
            catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        });
    }
    reduceProductQuantity(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const quan = -Math.abs(Number(quantity));
            return yield this.productModel.updateOne({ _id: productId }, { $inc: { quantity: quan } });
        });
    }
    getProductsByIds(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.find({ _id: { $in: productIds } });
        });
    }
}
exports.ProductRepository = ProductRepository;
