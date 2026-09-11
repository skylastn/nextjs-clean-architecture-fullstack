import { BeUserRepository } from "@/feature/auth/domain/be/repository/be_user_repository";
import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { BeUserRepositoryImpl } from "@/feature/auth/infrastructure/persistence/be/be_user_repository_impl";

export namespace BeUserService {
  const repo: BeUserRepository = new BeUserRepositoryImpl();

  export async function getListUser(
    page: number = 1,
    perPage: number = 10,
  ): Promise<{ data: BeUserResponse[]; total: number }> {
    const result = await repo.getListUser(page, perPage);
    const count = await repo.getCountUser();
    return { data: result, total: count };
  }

  export async function getDetailUserById(
    id: string,
  ): Promise<BeUserResponse | null> {
    return await repo.getDetailUserById(id);
  }
}
