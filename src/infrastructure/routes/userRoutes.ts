import express from "express"
import HashingService from "../utils/hashingService"
import jwtService from "../utils/jwtService"
import userRepository from "../../adapters/repository/userRepository"
import userUseCase from "../../useCases/userUseCase"
import UserController from "../../adapters/controllers/userController"
import User from "../model/userSchema"
import { CartRepository } from "../../adapters/repository/cartRepository"
import { CartUseCase } from "../../useCases/cartUseCase"
import { CartController } from "../../adapters/controllers/cartController"
import Cart from "../model/cartSchema"
// import userAuth from "../middlewares/userAuth"
import { WishlistRepository } from "../../adapters/repository/whishlistRepository"
import WhishlistSchema from "../model/whishlistSchema"
import { WishlistUseCase } from "../../useCases/whishlistUseCase"
import { WishlistController } from "../../adapters/controllers/whishlistController"
import OrderSchema from "../model/orderSchema"
import { ProductRepository } from "../../adapters/repository/productRepository"
import Product from "../model/productSchema"


const userRouter = express.Router()

const hashingService = new HashingService()
const JwtService = new jwtService()

const productRepository = new ProductRepository(Product)
const cartRepository = new CartRepository(Cart);
const cartUseCase = new CartUseCase(cartRepository,productRepository);
const cartController = new CartController(cartUseCase);

const UserRepository = new userRepository(User,OrderSchema)
const UserUseCase = new userUseCase(UserRepository,hashingService,JwtService,cartRepository,productRepository)
const userController = new UserController(UserUseCase)


const wishlistRepository = new WishlistRepository(WhishlistSchema);
const wishlistUseCase = new WishlistUseCase(wishlistRepository);
const wishlistController = new WishlistController(wishlistUseCase);

// Routes
userRouter.get("/wishlist/:userId", wishlistController.getWishlist.bind(wishlistController));
userRouter.post("/wishlist/:userId", wishlistController.addToWishlist.bind(wishlistController));
userRouter.delete("/wishlist/:userId/:productId", wishlistController.removeFromWishlist.bind(wishlistController));


userRouter.get("/cart/:userId", cartController.getCart.bind(cartController));
userRouter.post("/cart/:userId", cartController.addToCart.bind(cartController));
userRouter.patch("/productQuantity",cartController.updateQuantity.bind(cartController))
userRouter.delete("/removeFromCart/:cartId/:productId",cartController.removeFromCart.bind(cartController));

userRouter.get("/orders/:userId",userController.getOrders.bind(userController))
userRouter.post("/placeOrder",userController.placeOrder.bind(userController))
userRouter.post("/address/:userId", userController.addAddress.bind(userController));

userRouter.get("/test",(req,res)=>{
  res.send({message : "successfully hosted"})
})
userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.post('/logout',userController.logout)

export default userRouter