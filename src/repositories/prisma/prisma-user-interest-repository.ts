import { prisma } from "@/lib/prisma";
import { Prisma, UserInterest } from "@prisma/client";
import { UserInterestRepository } from "../UserInterestRepository";

export class PrismaUserInterestRepository implements UserInterestRepository {
  async create(data: Prisma.UserInterestCreateInput): Promise<UserInterest> {
    const userInterest = await prisma.userInterest.create({ data });

    return userInterest;
  }
  async findByUserEmail(email: string): Promise<UserInterest | null> {
    const userInterest = await prisma.userInterest.findFirst({
      where: { userId: email },
    });

    return userInterest;
  }
}
