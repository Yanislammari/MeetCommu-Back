import UserOutputDto from "../users/user.output.dto";

interface CommunityOutputDto {
  id: string;
  name: string;
  description?: string;
  pictureUrl?: string;
  creator: UserOutputDto;
  admins: UserOutputDto[];
  createdAt: Date;
  updatedAt: Date;
}

export default CommunityOutputDto;
