import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { Authenticate } from "@/use-cases/user/authenticate";

export function makeAuthenticateCase() {
  const userRepository = new PrismaUserRepository();
  const authenticateCase = new Authenticate(userRepository);

  return authenticateCase;
}
