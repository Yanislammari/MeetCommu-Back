interface IRepository<T> {
  getAll: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
  create: (item: T) => Promise<T>;
  update: (id: string, item: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export default IRepository;
