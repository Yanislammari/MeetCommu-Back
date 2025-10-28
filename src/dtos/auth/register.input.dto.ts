import Role from "../../models/role";

interface RegisterInputDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export default RegisterInputDto;
