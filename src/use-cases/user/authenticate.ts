import { UserRepository } from "@/repositories/UserRepository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { InvalidProviderError } from "../errors/invalid-provider-error";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { WrongPasswordError } from "../errors/wrong-password-error";

interface AuthenticateRequest {
  provider: "google" | "credentials";
  email: string;
  password?: string;
}

interface AuthenticateResponse {
  user: User;
}

export class Authenticate {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    provider,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (provider === "google") {
      return { user };
    }

    if (!user.password) {
      throw new InvalidProviderError();
    }

    const passwordMatch = await compare(password ?? "", user.password ?? "");
    if (!passwordMatch) {
      throw new WrongPasswordError();
    }

    return { user };
  }
}
