import { GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLInputObjectType } from "graphql";

const UpdateMessageInput = new GraphQLInputObjectType({
  name: "UpdateMessageInput",
  description: "Input type for update a message",
  fields: {
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export default UpdateMessageInput;
