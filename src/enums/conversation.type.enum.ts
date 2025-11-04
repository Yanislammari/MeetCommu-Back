import { GraphQLEnumType } from "graphql";

const ConversationTypeEnum = new GraphQLEnumType({
  name: "ConversationType",
  description: "The type of a conversation",
  values: {
    DIRECT: {
      value: "direct"
    },
    GROUP: {
      value: "group"
    }
  },
});

export default ConversationTypeEnum;
