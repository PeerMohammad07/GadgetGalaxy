import IHashingService from "../interfaces/IHashingService"
import IjwtService from "../interfaces/IJwtService"
import IUser from "../interfaces/User/IUser"
import IUserRepository from "../interfaces/User/IUserRepository"
import IUserUseCase from "../interfaces/User/IUserUseCase"


export default class userUseCase implements IUserUseCase {
  private userRepository: IUserRepository
  private hashingService: IHashingService
  private jwtService: IjwtService

  constructor(userRepository: IUserRepository, hashingService: IHashingService, jwtService: IjwtService) {
    this.userRepository = userRepository
    this.hashingService = hashingService
    this.jwtService = jwtService
  }

  async register(data: IUser) {
    const userExists = await this.userRepository.checkUserExists(data.email)
    if (userExists) {
      return {
        status: false,
        message: {
          email : "User already exists with this email"
        }
      }
    }

    if (data.password) {
      data.password = await this.hashingService.hashing(data.password)
    }

    const user:any = await this.userRepository.createUser(data.name, data.email, data.password)
    if (user) {
      return {
        status: true,
        message: "User created successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        }
      }
    }

    const payload = { id: user._id, name: user.name , isAdmin : user.isAdmin }
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

}