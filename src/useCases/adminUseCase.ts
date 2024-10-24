import IAdminRepository from "../interfaces/Admin/IAdminRepository";
import IAdminUseCase from "../interfaces/Admin/IAdminUseCase";
import IHashingService from "../interfaces/IHashingService";
import IJwtService from "../interfaces/IJwtService";


export default class AdminUseCase implements IAdminUseCase {
  private adminRepository: IAdminRepository;
  private hashingService: IHashingService;
  private jwtService: IJwtService;

  constructor(adminRepository: IAdminRepository, hashingService: IHashingService, jwtService: IJwtService) {
    this.adminRepository = adminRepository;
    this.hashingService = hashingService;
    this.jwtService = jwtService;
  }

  async login(email: string, password: string) {
    const admin = await this.adminRepository.checkAdminExists(email);
    if (!admin) {
      return {
        status: false,
        message: {
          email: "Admin Not Found"
        }
      };
    }

    const status = await this.hashingService.compare(password, admin.password);
    if (!status) {
      return {
        status: false,
        message: {
          password: "Incorrect Password"
        }
      };
    }

    const payload = { id: admin._id, name: admin.name , isAdmin : admin.isAdmin };
    const token = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);
    return {
      status: true,
      message: "Admin Login Successfully",
      data: { token, refreshToken, admin }
    };
  }

}
