import { IReturnMessage } from "../User/IUserUseCase";

export default interface IAdminUseCase {
  login(email: string, password: string): Promise< IReturnMessage | null>;
}
