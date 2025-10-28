import { GraphQLID, GraphQLNonNull } from "graphql";
import CommunityService from "../../services/community.service";
import { GraphQLList } from "graphql";
import CommunityType from "../../types/community.type";

const communityService = new CommunityService();

const CommunityQuery = {
  communities: {
    type: new GraphQLNonNull(new GraphQLList(CommunityType)),
    resolve: async (_parent: unknown, _args: any, _context: any) => {
      return communityService.getAllCommunities();
    }
  },
  community: {
    type: new GraphQLNonNull(CommunityType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return communityService.getCommunityById(args.id);
    }
  }
};

export default CommunityQuery;
