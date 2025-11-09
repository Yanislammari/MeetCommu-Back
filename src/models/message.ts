interface Message {
  id: string;
  content: string;
  attachmentsUrls?: string[];
  senderId: string;
  isUpdated?: boolean;
  isDeleted?: boolean;
  createdAt: Date
  updatedAt: Date
}

export default Message;
