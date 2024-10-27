import { ICartRepository } from "../interfaces/Cart/ICartRepository"
import IHashingService from "../interfaces/IHashingService"
import IjwtService from "../interfaces/IJwtService"
import { IProductRepository } from "../interfaces/Product/IProductRepository"
import IUser from "../interfaces/User/IUser"
import IUserRepository from "../interfaces/User/IUserRepository"
import IUserUseCase from "../interfaces/User/IUserUseCase"


export default class userUseCase implements IUserUseCase {
  private userRepository: IUserRepository
  private productRepository: IProductRepository
  private hashingService: IHashingService
  private jwtService: IjwtService
  private cartRepository: ICartRepository

  constructor(userRepository: IUserRepository, hashingService: IHashingService, jwtService: IjwtService, CartRepository: ICartRepository, ProductRepository: IProductRepository) {
    this.userRepository = userRepository
    this.hashingService = hashingService
    this.jwtService = jwtService
    this.cartRepository = CartRepository
    this.productRepository = ProductRepository
  }

  async register(data: IUser) {
    const userExists = await this.userRepository.checkUserExists(data.email)
    if (userExists) {
      return {
        status: false,
        message: {
          email: "User already exists with this email"
        }
      }
    }

    if (data.password) {
      data.password = await this.hashingService.hashing(data.password)
    }

    const user: any = await this.userRepository.createUser(data.name, data.email, data.password)
    if (user) {
      return {
        status: true,
        message: "User created successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      }
    }

    const payload = { id: user._id, name: user.name, isAdmin: user.isAdmin }
    const token = this.jwtService.generateToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)

    return {
      status: false,
      data: { token, refreshToken, user },
      message: "Failed to register",
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.checkUserExists(email)
    if (!user) {
      return {
        status: false,
        message: {
          email: "User Not Found"
        }
      }
    }

    const status = await this.hashingService.compare(password, user.password)
    if (!status) {
      return {
        status: false,
        message: {
          password: "Incorrect Password"
        }
      }
    }

    const payload = { id: user._id, name: user.name }
    const token = this.jwtService.generateToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)
    return {
      status: true,
      message: "User Login Succesfully",
      data: { token, refreshToken, user }
    }
  }

  async addAddress(userId: string, addressData: any): Promise<any | { status: number; message: string }> {
    const result = await this.userRepository.addAddress(userId, addressData.address);
    if (!result) {
      return { status: 409, message: "Failed to add address" };
    }
    return result;
  }

  async getAllUsers() {
    return this.userRepository.getAllUser()
  }

  async placeOrder(orderDetails: any) {
    try {
      const productIds = orderDetails.products.map((product: any) => product.productId);
      const products = await this.productRepository.getProductsByIds(productIds);

      for (const orderProduct of orderDetails.products) {
        const product = products.find((p: any) => p._id.toString() === orderProduct.productId);
        if (!product) {
          return { status: false, message: `Product with ID ${orderProduct.productId} not found` };
        }
        if (product.quantity < orderProduct.quantity) {
          return { status: false, message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${orderProduct.quantity}` };
        }
      }

      orderDetails.products.forEach((product: any) => {
        product.quantity = Number(product.quantity); 
      });

      const response: any = await this.userRepository.saveOrder(orderDetails);
      if (response) {
        await this.cartRepository.removeCartItems(orderDetails.userId);
        return response;
      } else {
        return { status: false, message: "Failed to place order" };
      }
    } catch (error) {
      console.error("Error placing order:", error);
      return { status: false, message: "An error occurred while placing the order." };
    }
  }
}