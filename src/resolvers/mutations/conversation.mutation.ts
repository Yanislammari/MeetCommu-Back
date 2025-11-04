import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import ConversationService from "../../services/conversation.service";
import ConversationType from "../../types/conversation.type";
import ConversationInput from "../../inputs/create.conversation.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const conversationService = new ConversationService();

const ConversationMutation = {
  createConversation: {
    type: new GraphQLNonNull(ConversationType),
    args: {
      input: {
        type: new GraphQLNonNull(ConversationInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return conversationService.addConversation(args.input, args.file);
    }
  },
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
