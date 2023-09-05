import { Prisma, UserInterest } from "@prisma/client";

export interface UserInterestRepository {
  create(data: Prisma.UserInterestCreateInput): Promise<UserInterest>;
  findByUserEmail(email: string): Promise<UserInterest | null>;
}
