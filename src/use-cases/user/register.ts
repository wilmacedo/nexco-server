import { UserRepository } from "@/repositories/UserRepository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  image?: string;
}

export interface RegisterResponse {
  user: User;
}

export class Register {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    image,
  }: RegisterRequest): Promise<RegisterResponse> {
    let encryptedPassword = undefined;
    if (password) {
      encryptedPassword = await hash(password, 6);
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new UserAlreadyExistsError();

    const user = await this.userRepository.create({
      email,
      name,
      image,
      password: encryptedPassword,
    });

    return { user };
  }
}
