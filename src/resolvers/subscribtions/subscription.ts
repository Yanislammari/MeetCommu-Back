import { GraphQLObjectType } from "graphql";
import MessageSubscription from "./message.subscription";

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    ...MessageSubscription
  },
});

export default Subscription;
