import mongoose, { Schema } from "mongoose"
import { IWishlist } from "../../interfaces/Whishlist/WhishlistInterface"
const ObjectId = mongoose.Schema.Types.ObjectId

const whishlistSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'user',
    required: true
  },
  products: [
    {
      productId: {
        type: ObjectId,
        ref: 'products',
        required: true
      }
    }
  ]
})

const WhishlistSchema = mongoose.model<IWishlist>("whishlist",whishlistSchema)
export default WhishlistSchema