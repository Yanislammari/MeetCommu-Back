import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import AuthService from "../../services/auth.service";
import RegisterInput from "../../inputs/register.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import LoginInput from "../../inputs/login.input";
import EmailScalar from "../../scalars/email.scalar";
import PasswordScalar from "../../scalars/password.scalar";

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
      return await authService.register(args.input, args.file);
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
      return await authService.login(args.input);
    }
  },
  sendPasswordResetEmail: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      email: {
        type: new GraphQLNonNull(EmailScalar)
      }
    },
    resolve: async (_parent: unknown, args: any) => {
      await authService.sendResetPasswordEmail(args.email);
      return true;
    }
  },
  resetPassword: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      password: {
        type: new GraphQLNonNull(PasswordScalar)
      }
    },
    resolve: async (_parent: unknown, args: any, context: any) => {
      const token: string = context.request.headers.authorization.split(' ')[1];
      await authService.resetPassword(args.password, token);
      return true;
    }
  },
  loginWithGoogle: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      idToken: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (_parent: unknown, args: any, context: any) => {
      return await authService.loginWithGoogle(args.idToken);
    }
  }
}

export default AuthMutation;
