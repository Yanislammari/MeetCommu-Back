import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import UserMapper from "../mappers/user.mapper";
import User from "../models/user";
import RegisterInput from "../models/register.input";
import { FileUpload } from "graphql-upload/Upload.mjs";
import { storeFile } from "../config/file";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY as string;
const BASE_URL: string = process.env.BASE_URL as string;
const SALT_ROUNDS: number = 10;

class AuthService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  public async register(input: RegisterInput, profilePicture?: Promise<FileUpload>): Promise<string> {
    const exinstingUser: User | null = await this.userRepository.getByEmail(input.email);
    if (exinstingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const user: User = this.userMapper.toEntity(input);
    const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword: string = await bcrypt.hash(input.password, salt);
    
    user.password = {
      hash: hashedPassword,
      salt: salt
    };

    if (profilePicture) {
      console.log("profile picture detected");
      const fileName: string = await storeFile(profilePicture, "profile-pictures");
      user.profilePictureUrl = `${BASE_URL}/uploads/profile-pictures/${fileName}`;
    }

    const addedUser: User = await this.userRepository.create(user);
    return jwt.sign({ id: addedUser.id }, SECRET_KEY, { expiresIn: "7d"});
  }
}

export default AuthService;
