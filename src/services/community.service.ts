import { FileUpload } from "graphql-upload/Upload.mjs";
import CommunityOutputDto from "../dtos/community/community.output.dto";
import CreateCommunityInputDto from "../dtos/community/create.community.input.dto";
import CommunityMapper from "../mappers/community.mapper";
import CommunityRepository from "../repositories/community.repository";
import Community from "../models/community";
import { deleteFile, storeFile } from "../config/file";
import dotenv from "dotenv";
import UpdateCommunityInputDto from "../dtos/community/update.community.dto";

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
    return await Promise.all(communities.map(async (community) => this.communityMapper.communityEntityToCommunityOutputDto(community)));
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

  public async updateCommunity(id: string, input: UpdateCommunityInputDto, picture?: Promise<FileUpload>): Promise<CommunityOutputDto> {
    const existingCommunity: Community = await this.communityRepository.get(id);
    const updatedCommunityEntity: Community = this.communityMapper.updateCommunityInputDtoToCommunityEntity(input, existingCommunity);

    if (picture) {
      if (existingCommunity.pictureUrl) {
        await deleteFile(existingCommunity.pictureUrl);
      }

      const fileName: string = await storeFile(picture, "community-pictures");
      updatedCommunityEntity.pictureUrl = `${BASE_URL}/uploads/community-pictures/${fileName}`;
    }

    const updatedCommunity: Community = await this.communityRepository.update(id, updatedCommunityEntity);
    return this.communityMapper.communityEntityToCommunityOutputDto(updatedCommunity);
  }

  public async deleteCommunity(id: string): Promise<void> {
    const existingCommunity: Community = await this.communityRepository.get(id);

    if (existingCommunity.pictureUrl) {
      await deleteFile(existingCommunity.pictureUrl);
    }

    await this.communityRepository.delete(id);
  }
}

export default CommunityService;
