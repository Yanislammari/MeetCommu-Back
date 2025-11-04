import mongoose from "mongoose";
import Message from "../models/message";
import BaseRepository from "./base.repository";
import MessageSchema from "../schemas/message.schema";

class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super(mongoose.model<Message>("Message", MessageSchema));
  }
}

export default MessageRepository;
