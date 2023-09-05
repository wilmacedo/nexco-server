import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AddInterests } from "@/use-cases/user/add-interests";

export function makeAddInterestsCase() {
  const userRepository = new PrismaUserRepository();
  const addInterests = new AddInterests(userRepository);

  return addInterests;
}
