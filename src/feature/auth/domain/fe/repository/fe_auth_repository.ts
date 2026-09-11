import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { FeLoginRequest } from "../request/fe_login_request";
import { FeLoginResponse } from "../response/fe_login_response";

export interface FeAuthRepository {
  get isLogin(): boolean;
  login(
    request: FeLoginRequest,
  ): Promise<Either<ResponseModel, FeLoginResponse>>;
  logout(): Promise<Either<string, boolean>>;
}
