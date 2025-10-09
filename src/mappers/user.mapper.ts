import UserInputDto from "../dtos/user/user.input.dto";
import UserOutputDto from "../dtos/user/user.output.dto";
import Role from "../models/role";
import User from "../models/user";
import Visibility from "../models/visibility";

class UserMapper {
  public toEntity(input: UserInputDto | Partial<UserInputDto>): User {
    return {
      id: "",
      firstName: input.firstName!,
      lastName: input.lastName!,
      username: input.username!,
      email: input.email!,
      password: { hash: "", salt: "" },
      role: input.role || Role.USER,
      visibility: input.visibility || Visibility.PUBLIC,
      profilePictureUrl: input.profilePictureUrl || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  public toOutput(entity: User): UserOutputDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      username: entity.username,
      email: entity.email,
      role: entity.role,
      visibility: entity.visibility,
      profilePictureUrl: entity.profilePictureUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}

export default UserMapper;
