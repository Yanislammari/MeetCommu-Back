import CommunityOutputDto from "../dtos/community/community.output.dto";
import CommunityMapper from "../mappers/community.mapper";
import CommunityRepository from "../repositories/community.repository";

class CommunityService {
  private readonly communityRepository: CommunityRepository;
  private readonly communityMapper: CommunityMapper;

  constructor() {
    this.communityRepository = new CommunityRepository();
    this.communityMapper = new CommunityMapper();
  }

  public async getAllCommunities(): Promise<CommunityOutputDto[]> {
    const communities = await this.communityRepository.getAll();
    return communities.map(community => this.communityMapper.communityEntityToCommunityOutputDto(community));
  }

  public async getCommunityById(id: string): Promise<CommunityOutputDto> {
    const community = await this.communityRepository.get(id);
    return this.communityMapper.communityEntityToCommunityOutputDto(community);
  }
}

export default CommunityService;
