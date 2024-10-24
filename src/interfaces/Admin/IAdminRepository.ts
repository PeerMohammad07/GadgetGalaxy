import  { IUserData } from "../User/IUser";

export default interface IAdminRepository {
  checkAdminExists(email: string): Promise<IUserData | null>;
}
