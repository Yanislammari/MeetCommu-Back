import { GraphQLObjectType } from "graphql";
import AuthQuery from "./auth.query";
import UserQuery from "./user.query";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...AuthQuery,
    ...UserQuery
  },
});

export default Query;
