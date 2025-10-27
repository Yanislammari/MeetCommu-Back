import { GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLInputObjectType } from "graphql";

const CreateCommunityInput = new GraphQLInputObjectType({
  name: "CreateCommunityInput",
  description: "Input type for creating a community",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    }
  }
});

export default CreateCommunityInput;
