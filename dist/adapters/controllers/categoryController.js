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
exports.CategoryController = void 0;
const statusCodeEnum_1 = require("../../statusCodeEnum");
class CategoryController {
    constructor(categoryUseCase) {
        this.categoryUseCase = categoryUseCase;
    }
    // Get all categories
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryUseCase.getAllCategories();
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(categories);
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error fetching categories: ${error.message}` });
            }
        });
    }
    // Add a new category
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                const { name, description } = data;
                const newCategory = yield this.categoryUseCase.addCategory({ name, description });
                res.status(statusCodeEnum_1.HttpStatusEnum.CREATED).json(newCategory);
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding category: ${error.message}` });
            }
        });
    }
    // Edit an existing category
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const { name, description } = req.body;
                const updatedCategory = yield this.categoryUseCase.editCategory(categoryId, { name, description });
                if (updatedCategory) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(updatedCategory);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Category not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error updating category: ${error.message}` });
            }
        });
    }
    // Delete a category
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const deletedCategory = yield this.categoryUseCase.deleteCategory(categoryId);
                if (deletedCategory) {
                    res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(deletedCategory);
                }
                else {
                    res.status(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND).json({ message: "Category not found" });
                }
            }
            catch (error) {
                res.status(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: `Error deleting category: ${error.message}` });
            }
        });
    }
}
exports.CategoryController = CategoryController;
