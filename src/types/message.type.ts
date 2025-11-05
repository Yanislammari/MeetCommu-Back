import { GraphQLBoolean, GraphQLList } from "graphql";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLObjectType } from "graphql";
import UrlScalar from "../scalars/url.scalar";
import UserType from "./user.type";
import DateTimeScalar from "../scalars/datetime.scalar";

const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "A message sent between users",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    attachementsUrls: {
      type: new GraphQLList(UrlScalar)
    },
    sender: {
      type: new GraphQLNonNull(UserType)
    },
    isUpdated: {
      type: GraphQLBoolean,
      defaultValue: false
    },
    createdAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    },
    updatedAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    }
  })
});

export default MessageType;
