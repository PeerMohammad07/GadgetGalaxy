import IUser from "./User/IUser"

export interface IReturnMessage {
  status : boolean,
  message : any ,
  data? : any
}

export default interface IUserUseCase{
  register(data:IUser):Promise<IReturnMessage>
  login(email:string,password:string):Promise<IReturnMessage>
}