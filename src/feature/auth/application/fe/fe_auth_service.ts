import { FeAuthRepository } from "@/feature/auth/domain/fe/repository/fe_auth_repository";
import { FeLoginRequest } from "@/feature/auth/domain/fe/request/fe_login_request";
import { FeLoginResponse } from "@/feature/auth/domain/fe/response/fe_login_response";
import { FeAuthLocalDataSource } from "@/feature/auth/infrastructure/data_source/fe/fe_auth_local_data_source";
import { FeAuthRemoteDataSource } from "@/feature/auth/infrastructure/data_source/fe/fe_auth_remote_data_source";
import { FeAuthRepositoryImpl } from "@/feature/auth/infrastructure/persistence/fe/fe_auth_repository_impl";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";

export class FeAuthService {
  private repo: FeAuthRepository;

  constructor() {
    this.repo = new FeAuthRepositoryImpl(
      new FeAuthLocalDataSource(),
      new FeAuthRemoteDataSource(),
    );
  }

  get isLogin(): boolean {
    return this.repo.isLogin;
  }

  async login(
    request: FeLoginRequest,
  ): Promise<Either<ResponseModel, FeLoginResponse>> {
    return await this.repo.login(request);
  }

  async logout(): Promise<Either<string, boolean>> {
    return await this.repo.logout();
  }
}
