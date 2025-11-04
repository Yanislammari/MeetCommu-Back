import UserOutputDto from "../users/user.output.dto";

interface MessageOutputDto {
  id: string;
  content: string;
  attachementsUrls?: string[];
  sender: UserOutputDto;
  createdAt: Date;
  updatedAt: Date;
}

export default MessageOutputDto;
