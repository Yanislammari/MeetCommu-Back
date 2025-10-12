import User from "../models/user";
import Role from "../models/role";
import Visibility from "../models/visibility";
import RegisterInput from "../models/register.input";

class UserMapper {
  public toEntity(input: RegisterInput): User {
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
      profilePictureUrl: input.profilePictureUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export default UserMapper;
