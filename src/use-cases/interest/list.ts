import { InterestRepository } from "@/repositories/InterestRepository";
import { Interest } from "@prisma/client";

interface ListResponse {
  interests: Interest[];
}

export class List {
  constructor(private interestRepository: InterestRepository) {}

  async execute(): Promise<ListResponse> {
    const interests = await this.interestRepository.list();

    return { interests };
  }
}
