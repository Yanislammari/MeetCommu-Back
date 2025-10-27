import CommunityOutputDto from "../dtos/community/community.output.dto";
import CreateCommunityInputDto from "../dtos/community/create.community.input.dto";
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

  public createCommunityInputDtoToCommunityEntity(input: CreateCommunityInputDto): Community {
    return {
      id: "",
      name: input.name,
      creatorId: "",
      adminIds: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export default CommunityMapper;
