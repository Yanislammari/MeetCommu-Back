import CreateMessageInputDto from "../dtos/message/create.message.input.dto";
import MessageOutputDto from "../dtos/message/message.output.dto";
import UpdateMessageInputDto from "../dtos/message/update.message.input.dto";
import UserOutputDto from "../dtos/users/user.output.dto";
import Message from "../models/message";
import UserService from "../services/user.service";

class MessageMapper {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async messageEntityToMessageOutputDto(message: Message): Promise<MessageOutputDto> {
    const sender: UserOutputDto = await this.userService.getUserById(message.senderId);

    return {
      id: message.id,
      content: message.content,
      attachmentsUrls: message.attachmentsUrls,
      sender: sender,
      isUpdated: message.isUpdated,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    }
  }

  public createMessageInputDtoToMessageEntity(createMessageInputDto: CreateMessageInputDto): Message {
    return {
      id: "",
      content: createMessageInputDto.content,
      senderId: "",
      isUpdated: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  public updateMessageInputDtoToMessageEntity(updateMessageInputDto: UpdateMessageInputDto, existingMessage: Message): Message {
    return {
      ...existingMessage,
      content: updateMessageInputDto.content ?? existingMessage.content,
      updatedAt: new Date()
    }
  }
}

export default MessageMapper;
