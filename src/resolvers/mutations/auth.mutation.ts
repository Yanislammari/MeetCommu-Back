import { GraphQLNonNull, GraphQLString } from "graphql";
import AuthService from "../../services/auth.service";
import RegisterInput from "../../inputs/register.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const authService = new AuthService();

const AuthMutation = {
  register: {
    type: GraphQLString,
    args: {
      input: {
        type: new GraphQLNonNull(RegisterInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any) => {
      return authService.register(args.input, args.file);
    }
  }
}

export default AuthMutation;
