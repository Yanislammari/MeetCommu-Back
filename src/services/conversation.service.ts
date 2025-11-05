import { FileUpload } from "graphql-upload/Upload.mjs";
import { deleteFile, storeFile } from "../config/file";
import ConversationOutputDto from "../dtos/conversation/conversation.output.dto";
import CreateConversationInputDto from "../dtos/conversation/create.conversation.input.dto";
import ConversationMapper from "../mappers/conversation.mapper";
import Conversation from "../models/conversation";
import Message from "../models/message";
import ConversationRepository from "../repositories/conversation.repository";
import MessageRepository from "../repositories/message.repository";
import dotenv from "dotenv";
import UpdateConversationInputDto from "../dtos/conversation/update.conversation.input.dto";
import ConversationType from "../models/conversation.type";
import User from "../models/user";
import UserRepository from "../repositories/user.repository";

dotenv.config();
const BASE_URL: string = process.env.BASE_URL as string;

class ConversationService {
  private readonly conversationRepository: ConversationRepository;
  private readonly conversationMapper: ConversationMapper;
  private readonly messageRepository: MessageRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.conversationMapper = new ConversationMapper();
    this.messageRepository = new MessageRepository();
    this.userRepository = new UserRepository();
  }

  public async getConversationsByUserId(userId: string): Promise<ConversationOutputDto[]> {
    const conversations: Conversation[] = await this.conversationRepository.getConversationsByUserId(userId);
    return await Promise.all(conversations.map(async (conversation) => this.conversationMapper.conversationEntityToConversationOutputDto(conversation)));
  }

  public async getConversationById(id: string): Promise<ConversationOutputDto> {
    const conversation: Conversation = await this.conversationRepository.get(id);
    return this.conversationMapper.conversationEntityToConversationOutputDto(conversation);
  }

  public async addConversation(input: CreateConversationInputDto, picture?: Promise<FileUpload>): Promise<ConversationOutputDto> {
    const conversation: Conversation = this.conversationMapper.createConversationInputDtoToConversationEntity(input);

    if (picture) {
      const fileName: string = await storeFile(picture, "conversation-pictures");
      conversation.pictureUrl = `${BASE_URL}/uploads/conversation-pictures/${fileName}`;
    }

    const addedConversation: Conversation = await this.conversationRepository.create(conversation);
    return this.conversationMapper.conversationEntityToConversationOutputDto(addedConversation);
  }

  public async updateConversation(id: string, input: UpdateConversationInputDto, picture?: Promise<FileUpload>): Promise<ConversationOutputDto> {
    const existingConversation: Conversation = await this.conversationRepository.get(id);
    const conversation: Conversation = this.conversationMapper.updateConversationInputDtoToConversationEntity(input, existingConversation);

    if (picture) {
      if (conversation.pictureUrl && conversation.type === ConversationType.GROUP) {
        await deleteFile(conversation.pictureUrl);
      }

      const fileName: string = await storeFile(picture, "conversation-pictures");
      conversation.pictureUrl = `${BASE_URL}/uploads/conversation-pictures/${fileName}`;
    }

    const updatedConversation: Conversation = await this.conversationRepository.update(id, conversation);
    return this.conversationMapper.conversationEntityToConversationOutputDto(updatedConversation);
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

  public async addUserToConversation(userId: string, conversationId: string): Promise<void> {
    const user: User = await this.userRepository.get(userId);
    const conversation: Conversation = await this.conversationRepository.get(conversationId);

    if (conversation.participantsIds.includes(user.id)) {
      throw new Error("USER_ALREADY_IN_CONVERSATION");
    }

    conversation.participantsIds.push(user.id);
    await this.conversationRepository.update(conversationId, conversation);
  }

  public async deleteUserFromConversation(userId: string, conversationId: string): Promise<void> {
    const user: User = await this.userRepository.get(userId);
    const conversation: Conversation = await this.conversationRepository.get(conversationId);

    if (!conversation.participantsIds.includes(user.id)) {
      throw new Error("USER_NOT_IN_CONVERSATION");
    }

    conversation.participantsIds = conversation.participantsIds.filter((participantId) => participantId !== user.id);
    if (conversation.participantsIds.length === 0) {
      await this.conversationRepository.delete(conversationId);
      return;
    }

    await this.conversationRepository.update(conversationId, conversation);
  }
}

export default ConversationService;
