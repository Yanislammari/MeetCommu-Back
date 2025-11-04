import MessageOutputDto from "../dtos/message/message.output.dto";
import MessageMapper from "../mappers/message.mapper";
import Message from "../models/message";
import MessageRepository from "../repositories/message.repository";

class MessageService {
  private readonly messageRepository: MessageRepository;
  private readonly messageMapper: MessageMapper;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.messageMapper = new MessageMapper();
  }

  public async getMessageById(id: string): Promise<MessageOutputDto> {
    const message: Message = await this.messageRepository.get(id);
    return this.messageMapper.messageEntityToMessageOutputDto(message);
  }
}

export default MessageService;
