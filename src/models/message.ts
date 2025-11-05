interface Message {
  id: string;
  content: string;
  attachementsUrls?: string[];
  senderId: string;
  isUpdated?: boolean;
  createdAt: Date
  updatedAt: Date
}

export default Message;
