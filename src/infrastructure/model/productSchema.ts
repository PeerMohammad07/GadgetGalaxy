import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../interfaces/Product/IProduct";
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new Schema({
    name:{
      type:String,
      required:true
    },
    quantity : {
      type : String,
      required : true
    },
    price : {
      type : Number,
      required : true
    },
    image : {
      type : String,
      required : true
    },
    description : {
      type : String,
      required : true,
    },
    category : {
      type : ObjectId,
      ref : "category",
      required : true
    }
})

const Product = mongoose.model<IProduct>("products",productSchema)
export default Product