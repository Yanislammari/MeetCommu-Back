import { GraphQLObjectType } from "graphql";
import AuthQuery from "./auth.query";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...AuthQuery
  },
});

export default Query;
