import mongoose from "mongoose";
import User from "../models/user";
import BaseRepository from "./base.repository";
import UserSchema from "../schemas/user.schema";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(mongoose.model<User>("User", UserSchema));
  }

  public async getByEmail(email: String): Promise<User | null> {
    const user = await this.model.findOne({ email });
    return user?.toObject() ?? null;
  }
}

export default UserRepository;
