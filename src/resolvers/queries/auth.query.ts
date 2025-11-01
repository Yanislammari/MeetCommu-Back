import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import AuthService from "../../services/auth.service";
import UserType from "../../types/user.type";
import EmailScalar from "../../scalars/email.scalar";

const authService = new AuthService();

const AuthQuery = {
  me: {
    type: new GraphQLNonNull(UserType),
    resolve: async (_parent: unknown, _args: any, context: any) => {
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
  checkEmailAvailability: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      email: {
        type: new GraphQLNonNull(EmailScalar)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return authService.checkEmailAvailability(args.email);
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
  },
  verifyResetPasswordToken: {
    type: new GraphQLNonNull(GraphQLBoolean),
    resolve: async (_parent: unknown, args: any, context: any) => {
      const token: string = context.request.headers.authorization.split(' ')[1];
      return authService.verifyResetPasswordToken(token);
    }
  }
};

export default AuthQuery;
