import IUser, { IUserData } from "./IUser"

export interface IReturnMessage {
  status : boolean,
  message : any ,
  data? : any
}

export default interface IUserUseCase{
  addAddress(userId: string, addressData: any): Promise<any | { status: number; message: string }>
  register(data:IUser):Promise<IReturnMessage>
  login(email:string,password:string):Promise<IReturnMessage>
  getAllUsers():Promise<IUserData[]>
  placeOrder(orderDetails:any):Promise<any>
}