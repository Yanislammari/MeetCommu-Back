import { deleteFile } from "../config/file";
import ConversationOutputDto from "../dtos/conversation/conversation.output.dto";
import ConversationMapper from "../mappers/conversation.mapper";
import Conversation from "../models/conversation";
import Message from "../models/message";
import ConversationRepository from "../repositories/conversation.repository";
import MessageRepository from "../repositories/message.repository";

class ConversationService {
  private readonly conversationRepository: ConversationRepository;
  private readonly conversationMapper: ConversationMapper;
  private readonly messageRepository: MessageRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.conversationMapper = new ConversationMapper();
    this.messageRepository = new MessageRepository();
  }

  public async getConversationsByUserId(userId: string): Promise<ConversationOutputDto[]> {
    const conversations: Conversation[] = await this.conversationRepository.getConversationsByUserId(userId);
    return await Promise.all(conversations.map(async (conversation) => this.conversationMapper.conversationEntityToConversationOutputDto(conversation)));
  }

  public async getConversationById(id: string): Promise<ConversationOutputDto> {
    const conversation: Conversation = await this.conversationRepository.get(id);
    return this.conversationMapper.conversationEntityToConversationOutputDto(conversation);
  }

  public async deleteConversation(id: string): Promise<void> {
    const conversation: Conversation = await this.conversationRepository.get(id);
    const messagesOfConversation: Message[] = await Promise.all(conversation.messagesIds.map((messageId: string) => this.messageRepository.get(messageId)));

    messagesOfConversation.forEach(async (message: Message) => {
      if (message.attachementsUrls && message.attachementsUrls.length > 0) {
        for (const messageUrl of message.attachementsUrls) {
          await deleteFile(messageUrl);
        }
      }

      await this.messageRepository.delete(message.id);
    });

    await this.conversationRepository.delete(id);
  }
}

export default ConversationService;
