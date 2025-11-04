import MessageOutputDto from "../dtos/message/message.output.dto";
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
      attachementsUrls: message.attachementsUrls,
      sender: sender,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    }
  }
}

export default MessageMapper;
