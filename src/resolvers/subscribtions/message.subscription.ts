import { GraphQLID, GraphQLNonNull } from "graphql";
import MessageType from "../../types/message.type";
import { pubSub } from "../../config/websockets";

const MessageSubscription = {
  messageSent: {
    type: new GraphQLNonNull(MessageType),
    args: {
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    subscribe: (_parent: unknown, args: any, _context: any) => {
      return pubSub.asyncIterableIterator(`MESSAGE_SENT_${args.conversationId}`)
    }
  },
  messageUpdated: {
    type: new GraphQLNonNull(MessageType),
    args: {
      conversationId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    subscribe: (_parent: unknown, args: any, _context: any) => {
      return pubSub.asyncIterableIterator(`MESSAGE_UPDATED_${args.conversationId}`)
    }
  }
};

export default MessageSubscription;
