import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import ConversationService from "../../services/conversation.service";
import ConversationType from "../../types/conversation.type";
import CreateConversationInput from "../../inputs/create.conversation.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import UpdateConversationInput from "../../inputs/update.conversation.input";

const conversationService = new ConversationService();

const ConversationMutation = {
  createConversation: {
    type: new GraphQLNonNull(ConversationType),
    args: {
      input: {
        type: new GraphQLNonNull(CreateConversationInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await conversationService.addConversation(args.input, args.file);
    }
  },
  updateConversation: {
    type: new GraphQLNonNull(ConversationType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      input: {
        type: new GraphQLNonNull(UpdateConversationInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await conversationService.updateConversation(args.input, args.file);
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
  },
  addUserToConversation: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      await conversationService.addUserToConversation(args.userId, args.conversationId);
      return true;
    }
  },
  deleteUserFromConversation: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      await conversationService.deleteUserFromConversation(args.userId, args.conversationId);
      return true;
    }
  }
}

export default ConversationMutation;
