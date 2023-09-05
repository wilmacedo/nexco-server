import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { Register } from "../user/register";

export function makeRegisterCase() {
  const userRepository = new PrismaUserRepository();
  const registerCase = new Register(userRepository);

  return registerCase;
}
