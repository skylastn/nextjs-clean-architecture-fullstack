import { FeUserRepository } from "@/feature/auth/domain/fe/repository/fe_user_repository";
import { FeUserResponse } from "@/feature/auth/domain/fe/response/fe_user_response";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { FeUserRemoteDataSource } from "../../data_source/fe/fe_user_remote_data_source";

export class FeUserRepositoryImpl implements FeUserRepository {
  constructor(private readonly remote = new FeUserRemoteDataSource()) {}

  async me(): Promise<Either<ResponseModel, FeUserResponse>> {
    return await this.remote.me();
  }
}
