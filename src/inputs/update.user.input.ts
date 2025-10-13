import { GraphQLInputObjectType, GraphQLString } from "graphql";
import EmailScalar from "../scalars/email.scalar";
import VisibilityEnum from "../enums/visibility.enum";

const UpdateUserInput = new GraphQLInputObjectType({
  name: "UpdateUserInput",
  description: "Input type for updating user information",
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: EmailScalar
    },
    visibility: {
      type: VisibilityEnum
    }
  }
});

export default UpdateUserInput;
