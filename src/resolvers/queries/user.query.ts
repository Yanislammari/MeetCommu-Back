import { GraphQLList } from "graphql";
import UserService from "../../services/user.service";
import UserType from "../../types/user.type";

const userService = new UserService();

const UserQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent: unknown, _args: any, _context: any) => {
      return userService.getAllUsers();
    }
  }
};

export default UserQuery;
