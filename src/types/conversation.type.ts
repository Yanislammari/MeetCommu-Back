import { GraphQLList, GraphQLString } from "graphql";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { GraphQLObjectType } from "graphql";
import UserType from "./user.type";
import MessageType from "./message.type";
import DateTimeScalar from "../scalars/datetime.scalar";
import ConversationTypeEnum from "../enums/conversation.type.enum";
import UrlScalar from "../scalars/url.scalar";

const ConversationType = new GraphQLObjectType({
  name: "Conversation",
  description: "A conversation between users",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    participants: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType)))
    },
    messages: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MessageType)))
    },
    type: {
      type: new GraphQLNonNull(ConversationTypeEnum)
    },
    title: {
      type: GraphQLString
    },
    pictureUrl: {
      type: UrlScalar
    },
    createdAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    },
    updatedAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    }
  })
});

export default ConversationType;
