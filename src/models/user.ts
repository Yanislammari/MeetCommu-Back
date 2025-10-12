import Password from "./password";
import Role from "./role";
import Visibility from "./visibility";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: Password;
  role: Role;
  visibility: Visibility;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
