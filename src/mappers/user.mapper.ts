import User from "../models/user";
import Role from "../models/role";
import Visibility from "../models/visibility";
import RegisterInputDto from "../dtos/auth/register.input.dto";
import UserOutputDto from "../dtos/users/user.output.dto";

class UserMapper {
  public toEntity(input: RegisterInputDto): User {
    return {
      id: "",
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      email: input.email,
      password: {
        hash: "",
        salt: ""
      },
      role: input.role || Role.USER,
      visibility: Visibility.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  public toDto(user: User): UserOutputDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      visibility: user.visibility,
      profilePictureUrl: user.profilePictureUrl
    };
  }
}

export default UserMapper;
