import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/UserRepository";
import { UserCompanyType } from "@prisma/client";
import { CompanyTypeNotFoundError } from "../errors/company-type-not-found-error";
import { UserAlreadyRegisteredCompanyTypeError } from "../errors/user-already-registered-company-type-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface AddCompanyTypeRequest {
  userEmail: string;
  typeIds: string[];
}

interface AddCompanyTypeResponse {
  userCompanyTypes: UserCompanyType[];
}

export class AddCompanyType {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    typeIds,
  }: AddCompanyTypeRequest): Promise<AddCompanyTypeResponse> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) throw new UserNotFoundError();

    let userCompanyTypes: UserCompanyType[] = [];
    await prisma.$transaction(async (transaction) => {
      for (const typeId of typeIds) {
        const type = await transaction.companyType.findUnique({
          where: { id: typeId },
        });
        if (!type) throw new CompanyTypeNotFoundError();

        const alreadyHasType = await transaction.userCompanyType.findMany({
          where: {
            userId: user.email,
            companyTypeId: type.id,
          },
        });
        if (alreadyHasType.length > 0) continue;

        const userCompanyType = await transaction.userCompanyType.create({
          data: {
            userId: user.email,
            companyTypeId: type.id,
          },
        });

        userCompanyTypes.push(userCompanyType);
      }
    });

    if (userCompanyTypes.length === 0)
      throw new UserAlreadyRegisteredCompanyTypeError();

    return { userCompanyTypes };
  }
}
