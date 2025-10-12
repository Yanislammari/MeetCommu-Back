import { GraphQLObjectType } from "graphql";
import AuthMutation from "./auth.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AuthMutation
  }
});

export default Mutation;
