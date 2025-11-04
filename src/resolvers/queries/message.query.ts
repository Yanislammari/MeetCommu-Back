import { GraphQLID, GraphQLNonNull } from "graphql";
import MessageService from "../../services/message.service";
import { GraphQLList } from "graphql";
import MessageType from "../../types/message.type";

const messageService = new MessageService();

const MessageQuery = {
  messagesOfConversation: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MessageType))),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await messageService.getMessageByConversationId(args.id);
    }
  }
};

export default MessageQuery;
