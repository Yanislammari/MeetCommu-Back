import ConversationType from "../../models/conversation.type";

interface CreateConversationInputDto {
  participantsIds: string[];
  type: ConversationType;
  title?: string;
}

export default CreateConversationInputDto;
