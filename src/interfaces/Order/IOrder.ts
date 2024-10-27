import { Document } from 'mongoose';
import { IProduct } from '../Product/IProduct';


export interface IDeliveryAddress {
  city: string; 
  state: string; 
  pinNo: string;
  name: string; 
  phNo: string; 
}

export interface IOrder extends Document {
  userId: string;
  products: IProduct[]; 
  totalAmount: number; 
  status: string; 
  paymentMethod: string; 
  deliveryAddress: IDeliveryAddress; 
  paymentId?: string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}
