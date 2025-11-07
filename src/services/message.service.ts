import { FileUpload } from "graphql-upload/Upload.mjs";
import CreateMessageInputDto from "../dtos/message/create.message.input.dto";
import MessageOutputDto from "../dtos/message/message.output.dto";
import MessageMapper from "../mappers/message.mapper";
import Conversation from "../models/conversation";
import Message from "../models/message";
import ConversationRepository from "../repositories/conversation.repository";
import MessageRepository from "../repositories/message.repository";
import { deleteFile, storeFile } from "../config/file";
import dotenv from "dotenv";
import UpdateMessageInputDto from "../dtos/message/update.message.input.dto";
import { pubSub } from "../config/websockets";

dotenv.config();
const BASE_URL: string = process.env.BASE_URL as string;

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

  public async addMessage(conversationId: string, input: CreateMessageInputDto, senderId: string, attachements: Promise<FileUpload[]>): Promise<MessageOutputDto> {
    const message: Message = this.messageMapper.createMessageInputDtoToMessageEntity(input);
    message.senderId = senderId;

    if (attachements) {
      const attachementFiles: FileUpload[] = await attachements;
      message.attachementsUrls = await Promise.all(
        attachementFiles.map(async (file: FileUpload) => {
          const fileName = await storeFile(Promise.resolve(file), "message-attachements");
          return `${BASE_URL}/uploads/message-attachements/${fileName}`;
        })
      );
    }

    const addedMessage: Message = await this.messageRepository.create(message);
    const conversation: Conversation = await this.conversationRepository.get(conversationId);

    conversation.messagesIds.push(addedMessage.id);
    await this.conversationRepository.update(conversationId, conversation);
    const messageDto: MessageOutputDto = await this.messageMapper.messageEntityToMessageOutputDto(addedMessage);

    await pubSub.publish(`MESSAGE_SENT_${conversationId}`, { messageSent: messageDto });

    return messageDto;
  }

  public async updateMessage(id: string, input: UpdateMessageInputDto, attachements?: Promise<FileUpload[]>): Promise<MessageOutputDto> {
    const existingMessage: Message = await this.messageRepository.get(id);
    const message: Message = this.messageMapper.updateMessageInputDtoToMessageEntity(input, existingMessage);

    message.isUpdated = true;

    if (attachements) {
      if (message.attachementsUrls && message.attachementsUrls.length > 0) {
        message.attachementsUrls.forEach(async (url: string) => {
          await deleteFile(url);
        });

        message.attachementsUrls = [];
      }

      const attachementFiles: FileUpload[] = await attachements;
      message.attachementsUrls = await Promise.all(attachementFiles.map(async (file: FileUpload) => {
        const fileName: string = await storeFile(Promise.resolve(file), "message-attachements");
        return `${BASE_URL}/uploads/message-attachements/${fileName}`;
      }));
    }

    const updatedMessage: Message = await this.messageRepository.update(id, message);
    return this.messageMapper.messageEntityToMessageOutputDto(updatedMessage);
  }

  public async deleteMessage(id: string): Promise<void> {
    const message: Message = await this.messageRepository.get(id);

    if (message.attachementsUrls && message.attachementsUrls.length > 0) {
      message.attachementsUrls.forEach(async (url: string) => {
        await deleteFile(url);
      });
    }

    await this.messageRepository.delete(id);
  }
}

export default MessageService;
