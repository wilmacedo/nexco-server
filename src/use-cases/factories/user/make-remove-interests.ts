import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RemoveInterests } from "@/use-cases/user/remove-interests";

export function makeRemoveInterestsCase() {
  const userRepository = new PrismaUserRepository();
  const removeInterests = new RemoveInterests(userRepository);

  return removeInterests;
}
