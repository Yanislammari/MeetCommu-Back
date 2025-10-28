import { GraphQLObjectType } from "graphql";
import AuthMutation from "./auth.mutation";
import UserMutation from "./user.mutation";
import CommunityMutation from "./community.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AuthMutation,
    ...UserMutation,
    ...CommunityMutation
  }
});

export default Mutation;
