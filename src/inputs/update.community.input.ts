import { GraphQLInputObjectType, GraphQLString } from "graphql";

const UpdateCommunityInput = new GraphQLInputObjectType({
  name: "UpdateCommunityInput",
  description: "Input type for updating community information",
  fields: {
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

export default UpdateCommunityInput;
