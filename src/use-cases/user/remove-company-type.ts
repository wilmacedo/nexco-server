import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/UserRepository";
import { CompanyTypeNotFoundError } from "../errors/company-type-not-found-error";
import { UserDontHaveCompanyTypeError } from "../errors/user-dont-have-company-type-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface RemoveCompanyTypeRequest {
  userEmail: string;
  typeIds: string[];
}

export class RemoveCompanyType {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    typeIds,
  }: RemoveCompanyTypeRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) throw new UserNotFoundError();

    let deleteCount = 0;
    await prisma.$transaction(async (transaction) => {
      for (const typeId of typeIds) {
        const type = await transaction.companyType.findUnique({
          where: { id: typeId },
        });
        if (!type) throw new CompanyTypeNotFoundError();

        const currentType = await transaction.userCompanyType.findMany({
          where: {
            userId: user.email,
            companyTypeId: type.id,
          },
        });
        if (currentType.length === 0) continue;

        await transaction.userCompanyType.delete({
          where: {
            id: currentType[0].id,
          },
        });

        deleteCount++;
      }
    });

    if (deleteCount === 0) throw new UserDontHaveCompanyTypeError();
  }
}
