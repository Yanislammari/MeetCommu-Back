import { FileUpload } from "graphql-upload/Upload.mjs";
import UpdateUserInputDto from "../dtos/users/update.user.input.dto";
import UserOutputDto from "../dtos/users/user.output.dto";
import UserMapper from "../mappers/user.mapper";
import User from "../models/user";
import UserRepository from "../repositories/user.repository";
import { deleteFile, storeFile } from "../config/file";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL: string = process.env.BASE_URL as string;

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  public async getAllUsers(): Promise<UserOutputDto[]> {
    const users: User[] = await this.userRepository.getAll();
    return users.map(user => this.userMapper.userEntityToUserOutputDto(user));
  }

  public async getUserById(id: string): Promise<UserOutputDto> {
    const user: User = await this.userRepository.get(id);
    return this.userMapper.userEntityToUserOutputDto(user);
  }

  public async updateUser(id: string, input: Partial<UpdateUserInputDto>, profilePicture?: Promise<FileUpload>): Promise<UserOutputDto> {
    const existingUser: User = await this.userRepository.get(id);
    const updatedUserEntity: User = this.userMapper.updateInputToUserEntity(input, existingUser);

    if (profilePicture) {
      if (existingUser.profilePictureUrl) {
        await deleteFile(existingUser.profilePictureUrl);
      }

      const fileName: string = await storeFile(profilePicture, "profile-pictures");
      updatedUserEntity.profilePictureUrl = `${BASE_URL}/uploads/profile-pictures/${fileName}`;
    }

    const updatedUser: User = await this.userRepository.update(id, updatedUserEntity);
    return this.userMapper.userEntityToUserOutputDto(updatedUser);
  }
}

export default UserService;
