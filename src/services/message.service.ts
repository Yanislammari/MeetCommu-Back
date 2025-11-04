import MessageOutputDto from "../dtos/message/message.output.dto";
import MessageMapper from "../mappers/message.mapper";
import Conversation from "../models/conversation";
import Message from "../models/message";
import ConversationRepository from "../repositories/conversation.repository";
import MessageRepository from "../repositories/message.repository";

class MessageService {
  private readonly messageRepository: MessageRepository;
  private readonly messageMapper: MessageMapper;
  private readonly conversationRepository: ConversationRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.messageMapper = new MessageMapper();
    this.conversationRepository = new ConversationRepository();
  }

  public async getMessageById(id: string): Promise<MessageOutputDto> {
    const message: Message = await this.messageRepository.get(id);
    return this.messageMapper.messageEntityToMessageOutputDto(message);
  }

  public async getMessageByConversationId(conversationId: string): Promise<MessageOutputDto[]> {
    const conversation: Conversation = await this.conversationRepository.get(conversationId);
    const messages: Message[] = await Promise.all(conversation.messagesIds.map((messageId: string) => this.messageRepository.get(messageId)));
    return await Promise.all(messages.map(async (message) => this.messageMapper.messageEntityToMessageOutputDto(message)));
  }
}

export default MessageService;
