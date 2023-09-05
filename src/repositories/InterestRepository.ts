import { Interest, Prisma } from "@prisma/client";

export interface InterestRepository {
  create(data: Prisma.InterestCreateInput): Promise<Interest>;
  findById(id: string): Promise<Interest | null>;
  findByName(name: string): Promise<Interest | null>;
  list(): Promise<Interest[]>;
}
