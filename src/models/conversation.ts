import ConversationType from "./conversation.type";

interface Conversation {
  id: string;
  participantsIds: string[];
  messagesIds: string[];
  type: ConversationType;
  title?: string;
  pictureUrl?: string;
  createdAt: Date
  updatedAt: Date
}

export default Conversation;
