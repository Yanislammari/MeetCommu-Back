import { GraphQLInputObjectType, GraphQLString } from "graphql";

const UpdateConversationInput = new GraphQLInputObjectType({
  name: "UpdateConversationInput",
  description: "Input type for update a conversation",
  fields: {
    title: {
      type: GraphQLString
    }
  }
});

export default UpdateConversationInput;
