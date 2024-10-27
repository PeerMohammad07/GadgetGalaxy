import { NextFunction, Request } from "express";
import jwtService from "../utils/jwtService";
import userSchema from "../model/userSchema";
import { refreshAccessToken } from "./userAuth";

const JwtService = new jwtService();

const adminAuth = async (req: Request, res: any, next: NextFunction) => {
  const refreshToken = req.cookies.adminRefreshToken;
  let adminToken = req.cookies.adminToken;

  if (!refreshToken) {
    return res.status(401).json({ status: false, message: "Not authorized" });
  }

  if (!adminToken || adminToken === "" || Object.keys(adminToken).length === 0) {
    try {
      const newAdminToken = await refreshAccessToken(refreshToken);
      res.cookie("adminToken", newAdminToken, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV !== "production",
      });
      adminToken = newAdminToken;
    } catch (error) {
      return res.status(401).json({ message: "Failed to refresh access token" });
    }
  }

  try {
    const decoded = await JwtService.verifyToken(adminToken);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ status: false, message: "Admin access denied" });
    }

    const admin = await userSchema.findOne({ _id: decoded.id, role: "admin" });
    if (!admin) {
      return res.status(401).json({ status: false, message: "Not Authorized, Admin not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Not authorized, invalid token" });
  }
};

export default adminAuth;
