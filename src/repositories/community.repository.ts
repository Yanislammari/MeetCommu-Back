import mongoose from "mongoose";
import BaseRepository from "./base.repository";
import Community from "../models/community";
import CommunitySchema from "../schemas/community.schema";

class CommunityRepository extends BaseRepository<Community> {
  constructor() {
    super(mongoose.model<Community>("Community", CommunitySchema));
  }
}

export default CommunityRepository;
