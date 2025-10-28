import User from "../models/user";
import Role from "../models/role";
import Visibility from "../models/visibility";
import RegisterInputDto from "../dtos/auth/register.input.dto";
import UserOutputDto from "../dtos/users/user.output.dto";
import UpdateUserInputDto from "../dtos/users/update.user.input.dto";

class UserMapper {
  public registerInputToUserEntity(input: RegisterInputDto): User {
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

  public userEntityToUserOutputDto(user: User): UserOutputDto {
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

  public updateInputToUserEntity(input: UpdateUserInputDto, existingUser: User): User {
    return {
      ...existingUser,
      firstName: input.firstName ?? existingUser.firstName,
      lastName: input.lastName ?? existingUser.lastName,
      username: input.username ?? existingUser.username,
      email: input.email ?? existingUser.email,
      visibility: input.visibility ?? existingUser.visibility,
      updatedAt: new Date()
    };
  }    
}

export default UserMapper;
