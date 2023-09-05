import { CompanyType, Prisma } from "@prisma/client";

export interface CompanyTypeRepository {
  create(data: Prisma.CompanyTypeCreateInput): Promise<CompanyType>;
  findById(id: string): Promise<CompanyType | null>;
  findByName(name: string): Promise<CompanyType | null>;
  list(): Promise<CompanyType[]>;
}
