import { prisma } from "@/lib/prisma";
import { CompanyType, Prisma } from "@prisma/client";
import { CompanyTypeRepository } from "../CompanyTypeRepository";

export class PrismaCompanyTypeRepository implements CompanyTypeRepository {
  async create(data: Prisma.CompanyTypeCreateInput): Promise<CompanyType> {
    const type = await prisma.companyType.create({ data });

    return type;
  }

  async findById(id: string): Promise<CompanyType | null> {
    const type = await prisma.companyType.findUnique({
      where: { id },
    });

    return type;
  }

  async findByName(name: string): Promise<CompanyType | null> {
    const type = await prisma.companyType.findUnique({
      where: {
        name,
      },
    });

    return type;
  }

  async list(): Promise<CompanyType[]> {
    const type = await prisma.companyType.findMany();

    return type;
  }
}
