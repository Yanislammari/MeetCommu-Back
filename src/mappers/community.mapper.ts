import CommunityOutputDto from "../dtos/community/community.output.dto";
import CreateCommunityInputDto from "../dtos/community/create.community.input.dto";
import UpdateCommunityInputDto from "../dtos/community/update.community.dto";
import UserOutputDto from "../dtos/users/user.output.dto";
import Community from "../models/community";
import User from "../models/user";
import UserService from "../services/user.service";

class CommunityMapper {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async communityEntityToCommunityOutputDto(community: Community): Promise<CommunityOutputDto> {
    const creator: UserOutputDto = await this.userService.getUserById(community.creatorId);
    const admins: UserOutputDto[] = await Promise.all(community.adminIds.map((adminId: string) => this.userService.getUserById(adminId)));

    return {
      id: community.id,
      name: community.name,
      description: community.description,
      pictureUrl: community.pictureUrl,
      creator,
      admins,
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

  public updateCommunityInputDtoToCommunityEntity(input: UpdateCommunityInputDto, existingCommunity: Community): Community {
    return {
      ...existingCommunity,
      name: input.name ?? existingCommunity.name,
      description: input.description ?? existingCommunity.description,
      adminIds: input.adminIds ?? existingCommunity.adminIds,
      updatedAt: new Date()
    }
  }
}

export default CommunityMapper;
