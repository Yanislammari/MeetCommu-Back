interface Message {
  id: string;
  content: string;
  attachementsUrls?: string[];
  senderId: string;
  createdAt: Date
  updatedAt: Date
}

export default Message;
