import CommunityOutputDto from "../dtos/community/community.output.dto";
import Community from "../models/community";

class CommunityMapper {
  public communityEntityToCommunityOutputDto(community: Community): CommunityOutputDto {
    return {
      id: community.id,
      name: community.name,
      description: community.description,
      pictureUrl: community.pictureUrl,
      creatorId: community.creatorId,
      adminIds: community.adminIds,
      createdAt: community.createdAt,
      updatedAt: community.updatedAt
    }
  }
}

export default CommunityMapper;
