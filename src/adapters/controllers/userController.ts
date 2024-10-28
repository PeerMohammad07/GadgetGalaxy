import { Request, response, Response } from "express"
import IUserUseCase from "../../interfaces/User/IUserUseCase"
import { HttpStatusEnum } from "../../statusCodeEnum"

export default class UserController {

  private userUseCase: IUserUseCase

  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.getAllUsers = this.getAllUsers.bind(this)
  }

  async register(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const { name, email, password } = req.body
      const response = await this.userUseCase.register({ name, email, password })
      if (!response.status) {
        res.status(HttpStatusEnum.CONFLICT).json(response)
        return
      }
      res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
      res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async login(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      const { email, password } = req.body
      const response = await this.userUseCase.login(email, password)
      if (!response?.status) {
        if (response.message.email) {
          res.status(404).json(response);
          return
        } else if (response.message.password) {
          res.status(HttpStatusEnum.NOT_FOUND).json(response);
          return
        }
      }
      res.cookie("userToken", response.data.token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
      res.cookie("userRefreshToken", response.data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV !== "development" });
      res.status(200).json({ status: true, message: response.message, data: response.data.user })
    } catch (error) {
      console.log(error)
    }
  }

  async logout(req: Request<any>, res: Response<any>): Promise<void> {
    try {
      res.cookie("userToken", "", { maxAge: 0 });
      res.cookie("userRefreshToken", "", { maxAge: 0 });
      res.status(HttpStatusEnum.OK).json({ status: true, message: "User logout successfully" })
    } catch (error) {
      console.log(error)
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userUseCase.getAllUsers();
      res.status(HttpStatusEnum.OK).json(users);
    } catch (error) {
      console.log(error)
    }
  }

  async addAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as any
      const addressData = req.body;
      const result = await this.userUseCase.addAddress(userId, addressData);
      if (result.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(HttpStatusEnum.CREATED).json(result);
      }
    } catch (error: any) {
      res.status(HttpStatusEnum.BAD_REQUEST).json({ message: `Error adding address: ${error.message}` });
    }
  }

  async placeOrder(req: Request, res: Response): Promise<void> {
    try {
      const { orderDetails } = req.body;
      const response = await this.userUseCase.placeOrder(orderDetails);
      console.log(response)
      if (!response.status) {
        res.status(HttpStatusEnum.BAD_REQUEST).json({
          message: response.message || "Failed to place order"
        });
        return
      }

      res.status(HttpStatusEnum.CREATED).json({
        message: "Order placed successfully",
        data: response
      });
    } catch (error: any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: `Error placing order: ${error.message}`
      });
    }
  }

  async getOrders(req: Request, res: Response): Promise<void>{
    try {
      const userId = req.params.userId
      const response = await this.userUseCase.getAllOrders(userId)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error:any) {
      res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: `Error getting order: ${error.message}`
      });
    }
  }

}