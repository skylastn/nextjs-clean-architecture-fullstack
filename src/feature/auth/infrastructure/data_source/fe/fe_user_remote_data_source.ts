import { FeUserResponse } from "@/feature/auth/domain/fe/response/fe_user_response";
import { UrlPath } from "@/shared/constant/url_path";
import { HttpMethod } from "@/shared/domain/model/enum/http_method";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { ApiClient } from "@/shared/network/api_client";
import { Either, left, right } from "@/shared/utils/utility/either";

export class FeUserRemoteDataSource {
  constructor(private api = new ApiClient()) {}

  async me(): Promise<Either<ResponseModel, FeUserResponse>> {
    try {
      const response = await this.api.request<FeUserResponse>({
        path: UrlPath.ME,
        method: HttpMethod.GET,
      });

      if (response.status == false) {
        return left(response);
      }

      return right(new FeUserResponse(response.data));
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }
}
