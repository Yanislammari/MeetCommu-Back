import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import UserMapper from "../mappers/user.mapper";
import User from "../models/user";
import { FileUpload } from "graphql-upload/Upload.mjs";
import { storeFile } from "../config/file";
import TokenPayload from "../config/payload";
import RegisterInputDto from "../dtos/auth/register.input.dto";
import LoginInputDto from "../dtos/auth/login.input.dto";
import UserOutputDto from "../dtos/users/user.output.dto";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY as string;
const BASE_URL: string = process.env.BASE_URL as string;
const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SALT_ROUNDS: number = 10;

class AuthService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  public async register(input: RegisterInputDto, profilePicture?: Promise<FileUpload>): Promise<string> {
    const exinstingUser: User | null = await this.userRepository.getByEmail(input.email);
    if (exinstingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const existingUsername: User | null = await this.userRepository.getByUsername(input.username);
    if (existingUsername) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }

    const user: User = this.userMapper.registerInputToUserEntity(input);
    const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword: string = await bcrypt.hash(input.password, salt);
    
    user.password = {
      hash: hashedPassword,
      salt: salt
    };

    if (profilePicture) {
      const fileName: string = await storeFile(profilePicture, "profile-pictures");
      user.profilePictureUrl = `${BASE_URL}/uploads/profile-pictures/${fileName}`;
    }

    const addedUser: User = await this.userRepository.create(user);
    return jwt.sign({ id: addedUser.id }, SECRET_KEY, { expiresIn: "7d"});
  }

  public async login(input: LoginInputDto): Promise<string> {
    const isEmail = EMAIL_REGEX.test(input.identifier);

    const user: User | null = isEmail
      ? await this.userRepository.getByEmail(input.identifier)
      : await this.userRepository.getByUsername(input.identifier);
  
    if (!user) {
      throw new Error(isEmail ? "INVALID_EMAIL_CREDENTIALS" : "INVALID_USERNAME_CREDENTIALS");
    }

    const isPasswordValid: boolean = await bcrypt.compare(input.password, user.password.hash);
    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD_CREDENTIALS");
    }

    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7d"});
  }

  public async checkEmailAvailability(email: string): Promise<boolean> {
    const user: User | null = await this.userRepository.getByEmail(email);
    return user ? false : true;
  }

  public async checkUsernameAvailability(username: string): Promise<boolean> {
    const user: User | null = await this.userRepository.getByUsername(username);
    return user ? false : true;
  }

  public async decodeToken(token: string): Promise<UserOutputDto> {
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as TokenPayload;
      const user: User | null = await this.userRepository.get(decodedToken.id);

      if (!user) {
        throw new Error("INVALID_TOKEN");
      }

      return this.userMapper.userEntityToUserOutputDto(user);
    }
    catch (error) {
      throw new Error("INVALID_TOKEN");
    }
  }
}

export default AuthService;
