import Role from "../../models/role";
import Visibility from "../../models/visibility";

interface UserOutputDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  visibility: Visibility;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default UserOutputDto;
