import Role from "../../models/role";
import Visibility from "../../models/visibility";

interface RegisterInputDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  visibility: Visibility
}

export default RegisterInputDto;
