interface Conversation {
  id: string;
  participantsIds: string[];
  messagesIds: string[];
  //group?: ; TO IMPLEMENT LATER
  createdAt: Date
  updatedAt: Date
}

export default Conversation;
