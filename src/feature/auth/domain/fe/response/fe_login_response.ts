import { FeUserResponse } from "@/feature/auth/domain/fe/response/fe_user_response";
import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export type FeLoginResponseWrapper = {
  status?: boolean;
  message?: string;
  data?: FeLoginResponse;
};

export class FeLoginResponse {
  token?: string;
  user?: FeUserResponse;

  constructor(data?: FeLoginResponse) {
    this.token = data?.token;
    this.user = data?.user ? new FeUserResponse(data.user) : undefined;
  }

  static Convert = ConvertResponse<FeLoginResponseWrapper>();
}
