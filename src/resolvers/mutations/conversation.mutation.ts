import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import ConversationService from "../../services/conversation.service";

const conversationService = new ConversationService();

const ConversationMutation = {
  deleteConversation: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      await conversationService.deleteConversation(args.id);
      return true;
    }
  }
}

export default ConversationMutation;
