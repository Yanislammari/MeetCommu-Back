import { GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import PasswordScalar from "../scalars/password.scalar";

const LoginInput = new GraphQLInputObjectType({
  name: "LoginInput",
  description: "Input type for user login",
  fields: {
    identifier: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(PasswordScalar)
    }
  }
});

export default LoginInput;
