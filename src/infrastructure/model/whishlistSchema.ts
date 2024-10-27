import mongoose, { Schema } from "mongoose"
import { IWishlist } from "../../interfaces/Whishlist/WhishlistInterface"
const ObjectId = mongoose.Schema.Types.ObjectId

const whishlistSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'user',
    required: true
  },
  productId :{
    type:ObjectId,
    ref:'product',
    required:true
  }
})

const WhishlistSchema = mongoose.model<IWishlist>("whishlist",whishlistSchema)
export default WhishlistSchema