import { GraphQLBoolean, GraphQLObjectType } from "graphql";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    _placeholder: {
      type: GraphQLBoolean,
      resolve: () => ({}),
    },
  },
});

export default Query;
