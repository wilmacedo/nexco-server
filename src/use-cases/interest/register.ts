import { InterestRepository } from "@/repositories/InterestRepository";
import { Interest } from "@prisma/client";
import { InterestAlreadyExistsError } from "../errors/interest-already-exists-error";

export interface RegisterRequest {
  name: string;
}

export interface RegisterResponse {
  interest: Interest;
}

export class Register {
  constructor(private interestRepository: InterestRepository) {}

  async execute({ name }: RegisterRequest): Promise<RegisterResponse> {
    const interestAlreadyExists = await this.interestRepository.findByName(
      name
    );
    if (interestAlreadyExists) throw new InterestAlreadyExistsError();

    const interest = await this.interestRepository.create({ name });

    return { interest };
  }
}
