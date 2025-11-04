import ConversationOutputDto from "../dtos/conversation/conversation.output.dto";
import MessageOutputDto from "../dtos/message/message.output.dto";
import UserOutputDto from "../dtos/users/user.output.dto";
import Conversation from "../models/conversation";
import MessageService from "../services/message.service";
import UserService from "../services/user.service";

class ConversationMapper {
  private readonly userService: UserService;
  private readonly messageService: MessageService;

  constructor() {
    this.userService = new UserService();
    this.messageService = new MessageService();
  }

  public async conversationEntityToConversationOutputDto(conversation: Conversation): Promise<ConversationOutputDto> {
    const participants: UserOutputDto[] = await Promise.all(conversation.participantsIds.map((participantId: string) => this.userService.getUserById(participantId)));
    const messages: MessageOutputDto[] = await Promise.all(conversation.messagesIds.map((messageId: string) => this.messageService.getMessageById(messageId)));

    return {
      id: conversation.id,
      participants: participants,
      messages: messages,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    }
  }
}

export default ConversationMapper;
