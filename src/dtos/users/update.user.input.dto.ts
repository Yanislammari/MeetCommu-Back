import Visibility from "../../models/visibility";

interface UpdateUserInputDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  visibility?: Visibility;
}

export default UpdateUserInputDto;
