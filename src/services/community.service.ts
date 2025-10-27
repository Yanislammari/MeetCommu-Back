import { FileUpload } from "graphql-upload/Upload.mjs";
import CommunityOutputDto from "../dtos/community/community.output.dto";
import CreateCommunityInputDto from "../dtos/community/create.community.input.dto";
import CommunityMapper from "../mappers/community.mapper";
import CommunityRepository from "../repositories/community.repository";
import Community from "../models/community";
import { storeFile } from "../config/file";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL: string = process.env.BASE_URL as string;

class CommunityService {
  private readonly communityRepository: CommunityRepository;
  private readonly communityMapper: CommunityMapper;

  constructor() {
    this.communityRepository = new CommunityRepository();
    this.communityMapper = new CommunityMapper();
  }

  public async getAllCommunities(): Promise<CommunityOutputDto[]> {
    const communities: Community[] = await this.communityRepository.getAll();
    return communities.map(community => this.communityMapper.communityEntityToCommunityOutputDto(community));
  }

  public async getCommunityById(id: string): Promise<CommunityOutputDto> {
    const community: Community = await this.communityRepository.get(id);
    return this.communityMapper.communityEntityToCommunityOutputDto(community);
  }

  public async addCommunity(input: CreateCommunityInputDto, creatorId: string, picture?: Promise<FileUpload>): Promise<CommunityOutputDto> {
    const community: Community = this.communityMapper.createCommunityInputDtoToCommunityEntity(input);

    if (picture) {
      const fileName: string = await storeFile(picture, "community-pictures");
      community.pictureUrl = `${BASE_URL}/uploads/community-pictures/${fileName}`;
    }

    community.creatorId = creatorId;
    community.adminIds.push(creatorId);
    const addedCommunity: Community = await this.communityRepository.create(community);
    return this.communityMapper.communityEntityToCommunityOutputDto(addedCommunity);
  }
}

export default CommunityService;
