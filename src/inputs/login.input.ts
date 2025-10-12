import { GraphQLNonNull } from "graphql";
import { GraphQLInputObjectType } from "graphql";
import EmailScalar from "../scalars/email.scalar";
import PasswordScalar from "../scalars/password.scalar";

const LoginInput = new GraphQLInputObjectType({
  name: "LoginInput",
  description: "Input type for user login",
  fields: {
    email: {
      type: new GraphQLNonNull(EmailScalar)
    },
    password: {
      type: new GraphQLNonNull(PasswordScalar)
    }
  }
});

export default LoginInput;
