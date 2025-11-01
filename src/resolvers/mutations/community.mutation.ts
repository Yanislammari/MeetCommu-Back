import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import CommunityService from "../../services/community.service";
import CommunityType from "../../types/community.type";
import CreateCommunityInput from "../../inputs/create.community.input";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const communityService = new CommunityService();

const CommunityMutation = {
  createCommunity: {
    type: new GraphQLNonNull(CommunityType),
    args: {
      input: {
        type: new GraphQLNonNull(CreateCommunityInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any, context: any) => {
      return await communityService.addCommunity(args.input, context.request.user.id, args.file);
    }
  },
  updateCommunity: {
    type: new GraphQLNonNull(CommunityType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      input: {
        type: new GraphQLNonNull(CreateCommunityInput)
      },
      file: {
        type: GraphQLUpload
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      return await communityService.updateCommunity(args.id, args.input, args.file);
    }
  },
  deleteCommunity: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (_parent: unknown, args: any, _context: any) => {
      await communityService.deleteCommunity(args.id);
      return true;
    }
  }
};

export default CommunityMutation;
