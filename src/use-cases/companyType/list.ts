import { CompanyTypeRepository } from "@/repositories/CompanyTypeRepository";
import { CompanyType } from "@prisma/client";

interface ListResponse {
  companyTypes: CompanyType[];
}

export class List {
  constructor(private companyTypeRepository: CompanyTypeRepository) {}

  async execute(): Promise<ListResponse> {
    const companyTypes = await this.companyTypeRepository.list();

    return { companyTypes };
  }
}
