import { GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLInputObjectType } from "graphql";

const CreateMessageInput = new GraphQLInputObjectType({
  name: "CreateMessageInput",
  description: "Input type for creating a new message",
  fields: {
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export default CreateMessageInput;
