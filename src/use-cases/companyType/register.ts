import { CompanyTypeRepository } from "@/repositories/CompanyTypeRepository";
import { CompanyType } from "@prisma/client";
import { CompanyTypeAlreadyExistsError } from "../errors/company-type-already-exists-error";

interface RegisterRequest {
  name: string;
  description: string;
}

interface RegisterResponse {
  companyType: CompanyType;
}

export class Register {
  constructor(private companyTypeRepository: CompanyTypeRepository) {}

  async execute({
    name,
    description,
  }: RegisterRequest): Promise<RegisterResponse> {
    const typeWithSameName = await this.companyTypeRepository.findByName(name);
    if (typeWithSameName) throw new CompanyTypeAlreadyExistsError();

    const companyType = await this.companyTypeRepository.create({
      name,
      description,
    });

    return { companyType };
  }
}
