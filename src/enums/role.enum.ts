import { GraphQLEnumType } from "graphql";

const RoleEnum = new GraphQLEnumType({
  name: "Role",
  description: "The role of a user",
  values: {
    ADMIN: {
      value: "admin"
    },
    USER: {
      value: "user"
    }
  },
});

export default RoleEnum;
