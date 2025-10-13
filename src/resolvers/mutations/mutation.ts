import { GraphQLObjectType } from "graphql";
import AuthMutation from "./auth.mutation";
import UserMutation from "./user.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AuthMutation,
    ...UserMutation
  }
});

export default Mutation;
