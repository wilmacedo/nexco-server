import { prisma } from "@/lib/prisma";
import { Interest, Prisma } from "@prisma/client";
import { InterestRepository } from "../InterestRepository";

export class PrismaInterestRepository implements InterestRepository {
  async create(data: Prisma.InterestCreateInput): Promise<Interest> {
    const interest = await prisma.interest.create({ data });

    return interest;
  }

  async findById(id: string): Promise<Interest | null> {
    const interest = await prisma.interest.findUnique({
      where: {
        id,
      },
    });

    return interest;
  }

  async findByName(name: string): Promise<Interest | null> {
    const interest = await prisma.interest.findUnique({
      where: {
        name,
      },
    });

    return interest;
  }

  async list(): Promise<Interest[]> {
    const interests = await prisma.interest.findMany();

    return interests;
  }
}
