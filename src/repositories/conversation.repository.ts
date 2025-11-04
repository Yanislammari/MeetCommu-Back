import mongoose from "mongoose";
import Conversation from "../models/conversation";
import BaseRepository from "./base.repository";
import ConversationSchema from "../schemas/conversation.schema";

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
}

export default ConversationRepository;
