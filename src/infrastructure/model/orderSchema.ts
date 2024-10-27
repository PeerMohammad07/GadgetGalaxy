import mongoose, { Schema } from "mongoose";
import { IOrder } from "../../interfaces/Order/IOrder";

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema({
  userId:{
    type:ObjectId,
    ref:'user',
    required:true
  },
  products:[
    {
      productId:{
        type:ObjectId,
        ref:'product',
        required:true
      },
      name:{
        type:String
      },
      price:{
        type:Number,
        
      },
      description:{
        type:String,
        
      },
      status :{
        type:String,
        enum: ['placed','cancelled'],
        default:'placed'
      },
      quantity :{
        type:Number,
      }
    }
  ],
  totalAmount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    required:true
  },
  paymentMethod:{
    type:String,
    required:true
  },
  deliveryAddress:{
    type:Object,
    required:true
  },
  paymentId:{
    type:String
  }
},{timestamps:true})

const OrderSchema = mongoose.model<IOrder>('orders',orderSchema)

export default OrderSchema


  