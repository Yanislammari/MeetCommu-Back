import mongoose from "mongoose";
import Conversation from "../models/conversation";
import BaseRepository from "./base.repository";
import ConversationSchema from "../schemas/conversation.schema";
import Message from "../models/message";

class ConversationRepository extends BaseRepository<Conversation> {
  constructor() {
    super(mongoose.model<Conversation>("Conversation", ConversationSchema));
  }

  public async getConversationsByUserId(userId: string): Promise<Conversation[]> {
    const conversations = await this.model
      .find({ participantsIds: { $in: [userId] } })
      .sort({ updatedAt: -1 });

    return conversations.map((conversation) => this.transformObjectIdsToString(conversation));
  }

  public async getLastMessageOfConversation(conversationId: string): Promise<Message | null> {
    const conversation = await this.model
      .findById(conversationId)
      .populate({
        path: "messagesIds",
        options: {
          sort: { createdAt: -1 },
          limit: 1
        },
      })
      .select("messagesIds");

    if (!conversation || !conversation.messagesIds.length) {
      return null;
    }

    return conversation.messagesIds[0] as unknown as Message;
  }

  public async getConversationOfMessage(messageId: string): Promise<Conversation | null> {
    const conversation = await this.model.findOne({ messagesIds: messageId });
    if (!conversation) {
      return null;
    }
    
    return this.transformObjectIdsToString(conversation);
  }
}

export default ConversationRepository;
