import UserOutputDto from "../dtos/users/user.output.dto";
import UserMapper from "../mappers/user.mapper";
import UserRepository from "../repositories/user.repository";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  public async getAllUsers(): Promise<UserOutputDto[]> {
    const users = await this.userRepository.getAll();
    return users.map(user => this.userMapper.toDto(user));
  }
}

export default UserService;
