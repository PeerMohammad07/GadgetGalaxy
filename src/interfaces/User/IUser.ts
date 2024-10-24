export default interface IUser {
  name : string,
  email : string,
  password : string,
  isAdmin? : boolean
}

export interface IUserData{
  _id : any,
  name : string,
  email : string,
  password : string,
  isAdmin? : boolean
}