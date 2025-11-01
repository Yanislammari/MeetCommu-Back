import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import EmailScalar from "../scalars/email.scalar";
import PasswordScalar from "../scalars/password.scalar";
import RoleEnum from "../enums/role.enum";
import Role from "../models/role";
import VisibilityEnum from "../enums/visibility.enum";
import Visibility from "../models/visibility";

const RegisterInput = new GraphQLInputObjectType({
  name: "RegisterInput",
  description: "Input type for user registration",
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(EmailScalar)
    },
    password: {
      type: new GraphQLNonNull(PasswordScalar)
    },
    role: {
      type: new GraphQLNonNull(RoleEnum),
      defaultValue: Role.USER
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum),
      defaultValue: Visibility.PUBLIC
    }
  }
});

export default RegisterInput;
