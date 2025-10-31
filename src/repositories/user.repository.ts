import mongoose from "mongoose";
import User from "../models/user";
import BaseRepository from "./base.repository";
import UserSchema from "../schemas/user.schema";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(mongoose.model<User>("User", UserSchema));
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email });
    return user?.toObject() ?? null;
  }

  public async getByUsername(username: string): Promise<User | null> {
    const user = await this.model.findOne({ username });
    return user?.toObject() ?? null;
  }
}

export default UserRepository;
