import { FeAuthRepository } from "@/feature/auth/domain/fe/repository/fe_auth_repository";
import { FeLoginRequest } from "@/feature/auth/domain/fe/request/fe_login_request";
import { FeLoginResponse } from "@/feature/auth/domain/fe/response/fe_login_response";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either, right } from "@/shared/utils/utility/either";
import { FeAuthLocalDataSource } from "../../data_source/fe/fe_auth_local_data_source";
import { FeAuthRemoteDataSource } from "../../data_source/fe/fe_auth_remote_data_source";

export class FeAuthRepositoryImpl implements FeAuthRepository {
  constructor(
    private readonly local = new FeAuthLocalDataSource(),
    private readonly remote = new FeAuthRemoteDataSource(),
  ) {}

  get isLogin(): boolean {
    return this.local.isLogin;
  }

  async login(
    request: FeLoginRequest,
  ): Promise<Either<ResponseModel, FeLoginResponse>> {
    const result = await this.remote.login(request);

    result.fold(
      () => {},
      (data) => {
        this.local.saveToken(data.token ?? "");
      },
    );

    return result;
  }

  async logout(): Promise<Either<string, boolean>> {
    await this.local.logout();
    return right(true);
  }
}
