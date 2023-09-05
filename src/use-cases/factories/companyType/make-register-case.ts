import { PrismaCompanyTypeRepository } from "@/repositories/prisma/prisma-company-type-repository";
import { Register } from "@/use-cases/companyType/register";

export function makeRegisterCase() {
  const companyTypeRepository = new PrismaCompanyTypeRepository();
  const registerCase = new Register(companyTypeRepository);

  return registerCase;
}
