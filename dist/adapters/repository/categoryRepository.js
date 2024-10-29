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
exports.CategoryRepository = void 0;
class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    // Get all categories
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.categoryModel.find();
            }
            catch (error) {
                throw new Error(`Error fetching categories: ${error.message}`);
            }
        });
    }
    // Add a category
    addCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = new this.categoryModel(categoryData);
                return yield newCategory.save();
            }
            catch (error) {
                throw new Error(`Error adding category: ${error.message}`);
            }
        });
    }
    // Edit a category
    editCategory(categoryId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield this.categoryModel.findByIdAndUpdate(categoryId, updateData, { new: true });
                return updatedCategory;
            }
            catch (error) {
                throw new Error(`Error updating category: ${error.message}`);
            }
        });
    }
    // Delete a category
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCategory = yield this.categoryModel.findByIdAndDelete(categoryId);
                return deletedCategory;
            }
            catch (error) {
                throw new Error(`Error deleting category: ${error.message}`);
            }
        });
    }
}
exports.CategoryRepository = CategoryRepository;
