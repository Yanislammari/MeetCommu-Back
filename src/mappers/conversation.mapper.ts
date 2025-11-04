import ConversationOutputDto from "../dtos/conversation/conversation.output.dto";
import CreateConversationInputDto from "../dtos/conversation/create.conversation.input.dto";
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
      type: conversation.type,
      title: conversation.title,
      pictureUrl: conversation.pictureUrl,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    }
  }

  public createConversationInputDtoToConversationEntity(input: CreateConversationInputDto): Conversation {
    return {
      id: "",
      participantsIds: input.participantsIds,
      messagesIds: [],
      type: input.type,
      title: input.title,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export default ConversationMapper;
