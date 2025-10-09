import Password from "../../models/password";
import Role from "../../models/role";
import Visibility from "../../models/visibility";

interface UserInputDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  visibility: Visibility;
  profilePictureUrl?: string;
}

export default UserInputDto;
