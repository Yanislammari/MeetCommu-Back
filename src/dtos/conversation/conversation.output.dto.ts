import ConversationType from "../../models/conversation.type";
import MessageOutputDto from "../message/message.output.dto";
import UserOutputDto from "../users/user.output.dto";

interface ConversationOutputDto {
  id: string;
  participants: UserOutputDto[];
  messages: MessageOutputDto[];
  type: ConversationType;
  title?: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ConversationOutputDto;
