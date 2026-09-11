import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { BaseResponse } from "@/shared/domain/model/response/base_response";

export type BeLoginResponseWrapper = BaseResponse<BeLoginResponse>;

export class BeLoginResponse {
  token?: string;
  user?: BeUserResponse;

  constructor(data?: BeLoginResponse) {
    this.token = data?.token;
    this.user = data?.user;
  }
}
