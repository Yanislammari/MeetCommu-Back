import mongoose from "mongoose";
import { Model, UpdateQuery } from "mongoose";
import IRepository from "./repository";

abstract class BaseRepository<T> implements IRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async getAll(): Promise<T[]> {
    const items = await this.model.find();
    return items.map((item) => this.transformObjectIdsToString(item));
  }

  public async get(id: string): Promise<T> {
    const item = await this.model.findById(id);
    if (!item) {
      throw new Error("Not found");
    }
    return this.transformObjectIdsToString(item);
  }

  public async create(data: T): Promise<T> {
    const created = await new this.model(data).save();
    return this.transformObjectIdsToString(created);
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const updated = await this.model.findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true });
    if (!updated) {
      throw new Error("Not found");
    }
    return this.transformObjectIdsToString(updated);
  }

  public async delete(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error("Not found");
    }
  }

  private transformObjectIdsToString(item: any): T {
    if (item) {
      const plainItem = item.toObject();

      Object.keys(plainItem).forEach((key) => {
        if (plainItem[key] instanceof mongoose.Types.ObjectId) {
          plainItem[key] = plainItem[key].toString();
        }
      });

      return plainItem as T;
    }
    return item as T;
  }
}

export default BaseRepository;
