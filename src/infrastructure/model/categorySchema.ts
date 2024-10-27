import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../interfaces/Category/ICategory";
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
    name:{
      type:String,
      required:true
    },
    description : {
      type : String,
      required : true,
    },
})

const Category = mongoose.model<ICategory>("category",categorySchema)
export default Category