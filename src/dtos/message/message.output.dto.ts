import UserOutputDto from "../users/user.output.dto";

interface MessageOutputDto {
  id: string;
  content: string;
  attachmentsUrls?: string[];
  sender: UserOutputDto;
  isUpdated?: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default MessageOutputDto;
