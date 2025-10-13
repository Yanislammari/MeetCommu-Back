interface CommunityOutputDto {
  id: string;
  name: string;
  description?: string;
  pictureUrl?: string;
  creatorId: string;
  adminIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default CommunityOutputDto;
