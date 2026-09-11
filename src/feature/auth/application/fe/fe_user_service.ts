import { FeUserRepository } from "@/feature/auth/domain/fe/repository/fe_user_repository";
import { FeUserResponse } from "@/feature/auth/domain/fe/response/fe_user_response";
import { FeUserRemoteDataSource } from "@/feature/auth/infrastructure/data_source/fe/fe_user_remote_data_source";
import { FeUserRepositoryImpl } from "@/feature/auth/infrastructure/persistence/fe/fe_user_repository_impl";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";

export class FeUserService {
  private repo: FeUserRepository;

  constructor() {
    this.repo = new FeUserRepositoryImpl(new FeUserRemoteDataSource());
  }

  async me(): Promise<Either<ResponseModel, FeUserResponse>> {
    return await this.repo.me();
  }
}
