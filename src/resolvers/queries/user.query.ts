import { GraphQLID, GraphQLList } from "graphql";
import UserService from "../../services/user.service";
import UserType from "../../types/user.type";
import { GraphQLNonNull } from "graphql";

const userService = new UserService();

const UserQuery = {
  users: {
    type: new GraphQLNonNull(new GraphQLList(UserType)),
    resolve: async (_parent: unknown, _args: any, _context: any) => {
      return userService.getAllUsers();
    }
  },
  user: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return userService.getUserById(args.id);
    }
  }
};

export default UserQuery;
