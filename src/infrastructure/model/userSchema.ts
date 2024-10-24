import mongoose, { Schema } from "mongoose"
import IUser from "../../interfaces/User/IUser"

const user = new Schema({
    name : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true
    },
    isAdmin : {
      type : Boolean,
      default : false,
      required : true
    }
})

const User = mongoose.model<IUser>("users",user)
export default User