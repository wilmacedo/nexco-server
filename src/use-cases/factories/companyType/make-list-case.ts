import { PrismaCompanyTypeRepository } from "@/repositories/prisma/prisma-company-type-repository";
import { List } from "@/use-cases/companyType/list";

export function makeListCase() {
  const companyTypeRepository = new PrismaCompanyTypeRepository();
  const listCase = new List(companyTypeRepository);

  return listCase;
}
