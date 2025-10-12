import Role from "./role";

interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  profilePictureUrl?: string;
}

export default RegisterInput;
