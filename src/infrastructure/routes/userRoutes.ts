import express from "express"
import HashingService from "../utils/hashingService"
import jwtService from "../utils/jwtService"
import userRepository from "../../adapters/repository/userRepository"
import userUseCase from "../../useCases/userUseCase"
import UserController from "../../adapters/controllers/userController"
import User from "../model/userSchema"


const userRouter = express.Router()

const hashingService = new HashingService()
const JwtService = new jwtService()
const UserRepository = new userRepository(User)
const UserUseCase = new userUseCase(UserRepository,hashingService,JwtService)
const userController = new UserController(UserUseCase)

userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.post('/logout',userController.logout)

export default userRouter