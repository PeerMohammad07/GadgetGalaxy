import { Request, Response } from "express";
import IAdminUseCase from "../../interfaces/Admin/IAdminUseCase";
import { HttpStatusEnum } from "../../statusCodeEnum";
import IUserUseCase from "../../interfaces/User/IUserUseCase";

export default class AdminController {
  private adminUseCase: IAdminUseCase;
  private userUseCase : IUserUseCase

  constructor(adminUseCase: IAdminUseCase,userUseCase:IUserUseCase) {
    this.adminUseCase = adminUseCase;
    this.userUseCase = userUseCase
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this.adminUseCase.login(email, password);
      if (!response?.status) {
        if (response?.message.email) {
          res.status(HttpStatusEnum.NOT_FOUND).json(response);
          return;
        } else if (response?.message.password) {
          res.status(HttpStatusEnum.BAD_REQUEST).json(response);
          return;
        }
      }
      res.cookie("adminToken", response?.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV != "development" });
      res.cookie("adminRefreshToken", response?.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV != "development" });
      res.status(HttpStatusEnum.OK).json({ status: true, message: response?.message, data: response?.data.admin });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      res.cookie("adminToken", "");
      res.cookie("adminRefreshToken", "");
      res.status(HttpStatusEnum.OK).json({ status: true, message: "Admin logout successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const response = await this.userUseCase.getAllUsers()
    } catch (error) {
      console.log(error)
    }
  }
}
