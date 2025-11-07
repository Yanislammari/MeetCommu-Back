import { GraphQLObjectType } from "graphql";
import AuthMutation from "./auth.mutation";
import UserMutation from "./user.mutation";
import CommunityMutation from "./community.mutation";
import ConversationMutation from "./conversation.mutation";
import MessageMutation from "./message.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AuthMutation,
    ...UserMutation,
    ...CommunityMutation,
    ...ConversationMutation,
    ...MessageMutation
  }
});

export default Mutation;
