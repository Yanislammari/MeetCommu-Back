import UserOutputDto from "../users/user.output.dto";

interface MessageOutputDto {
  id: string;
  content: string;
  attachementsUrls?: string[];
  sender: UserOutputDto;
  isUpdated?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default MessageOutputDto;
