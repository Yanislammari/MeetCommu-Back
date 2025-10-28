import { GraphQLEnumType } from "graphql";

const VisibilityEnum = new GraphQLEnumType({
  name: "Visibility",
  description: "Visibility status of a user or community",
  values: {
    PUBLIC: {
      value: "public"
    },
    PRIVATE: {
      value: "private"
    }
  },
});

export default VisibilityEnum;
