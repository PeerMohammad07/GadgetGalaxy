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
class userRepository {
    constructor(user, order) {
        this.user = user;
        this.order = order;
    }
    checkUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findOne({ email: email });
        });
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield new this.user({
                name: name,
                email: email,
                password: password
            });
            return yield user.save();
        });
    }
    checkUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.findOne({ _id: userId });
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.find();
        });
    }
    addAddress(userId, addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findById(userId);
            if (user) {
                console.log(user.addresses);
                user.addresses.push(addressData);
                return yield user.save();
            }
            return null;
        });
    }
    saveOrder(orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield new this.order(orderDetails);
            return yield order.save();
        });
    }
    getAllOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.order.find({ userId: userId });
        });
    }
}
exports.default = userRepository;
