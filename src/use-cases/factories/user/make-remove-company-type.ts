import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RemoveCompanyType } from "@/use-cases/user/remove-company-type";

export function makeRemoveCompanyTypeCase() {
  const userRepository = new PrismaUserRepository();
  const removeCompanyTypeCase = new RemoveCompanyType(userRepository);

  return removeCompanyTypeCase;
}
