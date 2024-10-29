"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./infrastructure/routes/userRoutes"));
const db_1 = __importDefault(require("./infrastructure/config/db"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const adminRoutes_1 = __importDefault(require("./infrastructure/routes/adminRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Config the Dotenv
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
// Setting Cors 
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// Use morgan middleware to log HTTP requests
app.use((0, morgan_1.default)("dev"));
// For parsing application/json
app.use(express_1.default.json());
// Mongodb Connect
(0, db_1.default)();
app.use("/api/user", userRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
const PORT = process.env.PORT || 3000;
// Server 
app.listen(PORT, () => {
    console.log("server is runnning on http://localhost:3000");
});
exports.default = app;
