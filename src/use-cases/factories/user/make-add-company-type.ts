import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AddCompanyType } from "@/use-cases/user/add-company-type";

export function makeAddCompanyTypeCase() {
  const userRepository = new PrismaUserRepository();
  const addCompanyTypeCase = new AddCompanyType(userRepository);

  return addCompanyTypeCase;
}
