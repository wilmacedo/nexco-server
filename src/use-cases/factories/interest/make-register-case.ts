import { PrismaInterestRepository } from "@/repositories/prisma/prisma-interest-repository";
import { Register } from "@/use-cases/interest/register";

export function makeRegisterCase() {
  const interestRepository = new PrismaInterestRepository();
  const registerCase = new Register(interestRepository);

  return registerCase;
}
