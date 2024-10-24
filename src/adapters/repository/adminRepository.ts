import { Model } from "mongoose";
import IUser from "../../interfaces/User/IUser";  
import IAdminRepository from "../../interfaces/Admin/IAdminRepository";

class adminRepository implements IAdminRepository {
  private admin: Model<IUser>;

  constructor(admin: Model<IUser>) {
    this.admin = admin;
  }

  async checkAdminExists(email: string) {
    return await this.admin.findOne({ email: email, isAdmin: true }); 
  }
}

export default adminRepository;
