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

  public async addMessage(conversationId: string, input: CreateMessageInputDto, senderId: string, attachments: Promise<FileUpload[]>): Promise<MessageOutputDto> {
    const message: Message = this.messageMapper.createMessageInputDtoToMessageEntity(input);
    message.senderId = senderId;

    if (attachments) {
      const attachmentFiles: FileUpload[] = await attachments;
      message.attachmentsUrls = await Promise.all(
        attachmentFiles.map(async (file: FileUpload) => {
          const fileName = await storeFile(Promise.resolve(file), "message-attachments");
          return `${BASE_URL}/uploads/message-attachments/${fileName}`;
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

  public async updateMessage(id: string, input: UpdateMessageInputDto, attachments?: Promise<FileUpload[]>): Promise<MessageOutputDto> {
    const existingMessage: Message = await this.messageRepository.get(id);
    const message: Message = this.messageMapper.updateMessageInputDtoToMessageEntity(input, existingMessage);

    message.isUpdated = true;

    if (attachments) {
      if (message.attachmentsUrls && message.attachmentsUrls.length > 0) {
        message.attachmentsUrls.forEach(async (url: string) => {
          await deleteFile(url);
        });

        message.attachmentsUrls = [];
      }

      const attachmentFiles: FileUpload[] = await attachments;
      message.attachmentsUrls = await Promise.all(attachmentFiles.map(async (file: FileUpload) => {
        const fileName: string = await storeFile(Promise.resolve(file), "message-attachments");
        return `${BASE_URL}/uploads/message-attachments/${fileName}`;
      }));
    }

    const updatedMessage: Message = await this.messageRepository.update(id, message);
    const messageDto = await this.messageMapper.messageEntityToMessageOutputDto(updatedMessage);

    const conversation: Conversation | null = await this.conversationRepository.getConversationOfMessage(id);
    if (!conversation) {
      throw new Error("MESSAGE_NOT_IN_CONVERSATION");
    }

    await pubSub.publish(`MESSAGE_UPDATED_${conversation.id}`, { messageUpdated: messageDto });

    return messageDto;
  }

  public async deleteMessage(id: string): Promise<void> {
    const message: Message = await this.messageRepository.get(id);

    if (message.attachmentsUrls && message.attachmentsUrls.length > 0) {
      message.attachmentsUrls.forEach(async (url: string) => {
        await deleteFile(url);
      });
    }

    message.isDeleted = true;
    message.content = "[MESSAGE_DELETED]";
    message.attachmentsUrls = [];

    const conversation: Conversation | null = await this.conversationRepository.getConversationOfMessage(id);
    if (!conversation) {
      throw new Error("MESSAGE_NOT_IN_CONVERSATION");
    }

    await pubSub.publish(`MESSAGE_DELETED_${conversation.id}`, { messageDeleted: message.id });
    await this.messageRepository.update(id, message);
  }
}

export default MessageService;
