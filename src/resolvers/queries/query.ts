import { GraphQLObjectType } from "graphql";
import AuthQuery from "./auth.query";
import UserQuery from "./user.query";
import CommunityQuery from "./community.query";
import ConversationQuery from "./conversation.query";
import MessageQuery from "./message.query";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...AuthQuery,
    ...UserQuery,
    ...CommunityQuery,
    ...ConversationQuery,
    ...MessageQuery
  },
});

export default Query;
