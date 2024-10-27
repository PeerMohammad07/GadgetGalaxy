import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interfaces/Cart/ICart";
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new Schema({
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
        },
        quantity: {
          type: Number,
          default: 1
        },
        productPrice: {
          type: Number,
          required: true
        },
        totalPrice: {
          type: Number,
          default: 0
        }
    }

  ]
})

const Cart = mongoose.model<ICart>("cart",cartSchema)
export default Cart