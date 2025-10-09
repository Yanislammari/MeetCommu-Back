import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import UserMapper from "../mappers/user.mapper";
import UserInputDto from "../dtos/user/user.input.dto";
import User from "../models/user";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY as string;
const SALT_ROUNDS: number = 10;

class AuthService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  public async register(userInput: UserInputDto): Promise<string> {
    const exinstingUser: User | null = await this.userRepository.getByEmail(userInput.email);
    if (exinstingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const user: User = this.userMapper.toEntity(userInput);
    const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword: string = await bcrypt.hash(userInput.password, salt);
    
    user.password = {
      hash: hashedPassword,
      salt: salt
    };

    const addedUser: User = await this.userRepository.create(user);
    return jwt.sign({ id: addedUser.id }, SECRET_KEY, { expiresIn: "7d"});
  }
}

export default AuthService;
