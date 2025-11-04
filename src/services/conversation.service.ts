import ConversationOutputDto from "../dtos/conversation/conversation.output.dto";
import ConversationMapper from "../mappers/conversation.mapper";
import Conversation from "../models/conversation";
import ConversationRepository from "../repositories/conversation.repository";

class ConversationService {
  private readonly conversationRepository: ConversationRepository;
  private readonly conversationMapper: ConversationMapper;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.conversationMapper = new ConversationMapper();
  }

  public async getConversationsByUserId(userId: string): Promise<ConversationOutputDto[]> {
    const conversations: Conversation[] = await this.conversationRepository.getConversationsByUserId(userId);
    return await Promise.all(conversations.map(async (conversation) => this.conversationMapper.conversationEntityToConversationOutputDto(conversation)));
  }
}

export default ConversationService;
