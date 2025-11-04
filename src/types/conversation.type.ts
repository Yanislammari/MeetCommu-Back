import { GraphQLList } from "graphql";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { GraphQLObjectType } from "graphql";
import UserType from "./user.type";
import MessageType from "./message.type";
import DateTimeScalar from "../scalars/datetime.scalar";

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
    /*group: {
      type: GraphQLObjectType
    }*/
    createdAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    },
    updatedAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    }
  })
});

export default ConversationType;
