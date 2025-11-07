import { GraphQLID, GraphQLNonNull } from "graphql";
import ConversationService from "../../services/conversation.service";
import { GraphQLList } from "graphql";
import ConversationType from "../../types/conversation.type";
import MessageType from "../../types/message.type";

const conversationService = new ConversationService();

const ConversationQuery = {
  conversationsOfUser: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ConversationType))),
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await conversationService.getConversationsByUserId(args.userId);
    }
  },
  conversation: {
    type: new GraphQLNonNull(ConversationType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await conversationService.getConversationById(args.id);
    }
  },
  lastMessageOfConversation: {
    type: new GraphQLNonNull(MessageType),
    args: {
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await conversationService.getLastMessageOfConversation(args.conversationId);
    }
  }
};

export default ConversationQuery;
