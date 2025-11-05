import { GraphQLID, GraphQLNonNull } from "graphql";
import MessageService from "../../services/message.service";
import MessageType from "../../types/message.type";
import CreateMessageInput from "../../inputs/create.message.input";
import { GraphQLList } from "graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const messageService = new MessageService();

const MessageMutation = {
  sendMessage: {
    type: new GraphQLNonNull(MessageType),
    args: {
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      input: {
        type: new GraphQLNonNull(CreateMessageInput)
      },
      files: {
        type: new GraphQLList(GraphQLUpload)
      }
    },
    resolve: async (_parent: unknown, args: any, context: any) => {
      return await messageService.addMessage(args.conversationId, args.input, context.user.id, args.files);
    }
  }
};

export default MessageMutation;
