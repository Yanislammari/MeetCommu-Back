import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import AuthService from "../../services/auth.service";
import UserType from "../../types/user.type";

const authService = new AuthService();

const AuthQuery = {
  me: {
    type: new GraphQLNonNull(UserType),
    resolve: async (_parent: unknown, args: any, context: any) => {
      try {
        const token: string = context.request.headers.authorization.split(' ')[1];

        if (!token) {
          throw new Error("TOKEN_NOT_PROVIDED");
        }

        return authService.decodeToken(token);
      }
      catch (error) {
        throw new Error("TOKEN_NOT_PROVIDED");
      }
    }
  },
  checkUsernameAvailability: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return authService.checkUsernameAvailability(args.username);
    }
  }
};

export default AuthQuery;
