import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/UserRepository";
import { InterestNotFoundError } from "../errors/interest-not-found-error";
import { UserDontHaveInterestsError } from "../errors/user-dont-have-interests-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface RemoveInterestsRequest {
  userEmail: string;
  interestIds: string[];
}

export class RemoveInterests {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    interestIds,
  }: RemoveInterestsRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) throw new UserNotFoundError();

    let deleteCount = 0;
    await prisma.$transaction(async (transaction) => {
      for (const interestId of interestIds) {
        const interest = await transaction.interest.findUnique({
          where: { id: interestId },
        });
        if (!interest) throw new InterestNotFoundError();

        const currentInterest = await transaction.userInterest.findMany({
          where: {
            userId: user.email,
            interestId: interest.id,
          },
        });
        if (currentInterest.length === 0) continue;

        await transaction.userInterest.delete({
          where: {
            id: currentInterest[0].id,
          },
        });

        deleteCount++;
      }
    });

    if (deleteCount === 0) throw new UserDontHaveInterestsError();
  }
}
