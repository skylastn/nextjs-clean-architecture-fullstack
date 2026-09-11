import { FeLoginRequest } from "@/feature/auth/domain/fe/request/fe_login_request";
import { FeLoginResponse } from "@/feature/auth/domain/fe/response/fe_login_response";
import { UrlPath } from "@/shared/constant/url_path";
import { HttpMethod } from "@/shared/domain/model/enum/http_method";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { ApiClient } from "@/shared/network/api_client";
import { Either, left, right } from "@/shared/utils/utility/either";

export class FeAuthRemoteDataSource {
  constructor(private api = new ApiClient()) {}

  async login(
    request: FeLoginRequest,
  ): Promise<Either<ResponseModel, FeLoginResponse>> {
    try {
      const response = await this.api.request<FeLoginResponse>({
        path: UrlPath.LOGIN,
        method: HttpMethod.POST,
        data: request,
      });

      if (response.status == false) {
        return left(response);
      }

      return right(new FeLoginResponse(response.data));
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }
}
