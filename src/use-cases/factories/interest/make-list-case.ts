import { PrismaInterestRepository } from "@/repositories/prisma/prisma-interest-repository";
import { List } from "@/use-cases/interest/list";

export function makeListCase() {
  const interestRepository = new PrismaInterestRepository();
  const listCase = new List(interestRepository);

  return listCase;
}
