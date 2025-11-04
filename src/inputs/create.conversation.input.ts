import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { GraphQLNonNull } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import ConversationTypeEnum from "../enums/conversation.type.enum";

const ConversationInput = new GraphQLInputObjectType({
  name: "ConversationInput",
  description: "Input type for creating a conversation",
  fields: {
    participantsIds: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID)))
    },
    type: {
      type: new GraphQLNonNull(ConversationTypeEnum)
    },
    title: {
      type: GraphQLString
    }
  }
});

export default ConversationInput;
