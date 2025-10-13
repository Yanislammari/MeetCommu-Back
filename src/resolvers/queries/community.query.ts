import { GraphQLNonNull } from "graphql";
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
  }
};

export default CommunityQuery;
