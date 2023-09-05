import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/UserRepository";
import { UserInterest } from "@prisma/client";
import { InterestNotFoundError } from "../errors/interest-not-found-error";
import { UserAlreadyRegisteredInterestError } from "../errors/user-already-registered-interest-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface AddInterestRequest {
  userEmail: string;
  interestIds: string[];
}

interface AddInterestResponse {
  userInterests: UserInterest[];
}

export class AddInterests {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    interestIds,
  }: AddInterestRequest): Promise<AddInterestResponse> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) throw new UserNotFoundError();

    let userInterests: UserInterest[] = [];
    await prisma.$transaction(async (transaction) => {
      for (const interestId of interestIds) {
        const interest = await transaction.interest.findUnique({
          where: { id: interestId },
        });
        if (!interest) throw new InterestNotFoundError();

        const alreadyHasInterest = await transaction.userInterest.findMany({
          where: {
            userId: user.email,
            interestId: interest.id,
          },
        });
        if (alreadyHasInterest.length > 0) continue;

        const userInterest = await transaction.userInterest.create({
          data: {
            userId: user.email,
            interestId: interest.id,
          },
        });

        userInterests.push(userInterest);
      }
    });

    if (userInterests.length === 0)
      throw new UserAlreadyRegisteredInterestError();

    return { userInterests };
  }
}
