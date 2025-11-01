import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import UserService from "../../services/user.service";
import UserType from "../../types/user.type";
import UpdateUserInput from "../../inputs/update.user.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const userService = new UserService();

const UserMutation = {
  updateUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      input: {
        type: new GraphQLNonNull(UpdateUserInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any) => {
      return await userService.updateUser(args.id, args.input, args.file);
    }
  },
  deleteUser: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any) => {
      await userService.deleteUser(args.id);
      return true;
    }
  }
};

export default UserMutation;
