import { Model } from "mongoose";
import IUser from "../../interfaces/User/IUser";
import IUserRepository from "../../interfaces/User/IUserRepository";

class userRepository implements IUserRepository {
  private user: Model<IUser>

  constructor(user: Model<IUser>) {
    this.user = user
  }

  async checkUserExists(email: string) {
    return await this.user.findOne({ email: email })
  }

  async createUser(name: string, email: string, password: string) {
    const user = await new this.user({
      name: name,
      email: email,
      password: password
    })
    return await user.save()
  }

  async checkUser(userId:string){
    return this.user.findOne({_id:userId})
  }

}

export default userRepository