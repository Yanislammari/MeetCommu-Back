import { GraphQLNonNull, GraphQLString } from "graphql";
import AuthService from "../../services/auth.service";
import RegisterInput from "../../inputs/register.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import LoginInput from "../../inputs/login.input";

const authService = new AuthService();

const AuthMutation = {
  register: {
    type: new GraphQLNonNull(GraphQLString),
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
  },
  login: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      input: {
        type: new GraphQLNonNull(LoginInput)
      }
    },
    resolve: async (_parent: unknown, args: any) => {
      return authService.login(args.input);
    }
  }
}

export default AuthMutation;
