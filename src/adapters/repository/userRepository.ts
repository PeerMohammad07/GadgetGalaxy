import { Model } from "mongoose";
import IUser from "../../interfaces/User/IUser";
import IUserRepository from "../../interfaces/User/IUserRepository";
import { IOrder } from "../../interfaces/Order/IOrder";

class userRepository implements IUserRepository {
  private user: Model<IUser>
  private order : Model<IOrder>

  constructor(user: Model<IUser>,order:Model<IOrder>) {
    this.user = user
    this.order = order
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

  async getAllUser(){
    return this.user.find()
  }

  async addAddress(userId: string, addressData: any): Promise<any | null> {
    const user:any = await this.user.findById(userId);
    if (user) {
      console.log(user.addresses)
      user.addresses.push(addressData);
      return await user.save();
    }
    return null;
  }

  async saveOrder(orderDetails:any){
    const order = await new this.order(orderDetails)
    return await order.save()
  }
}

export default userRepository