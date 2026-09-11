import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { BeLoginRequest } from "../request/be_login_request";
import { BeRegisterRequest } from "../request/be_register_request";
import { BeResendOtpRequest } from "../request/be_resend_otp_request";
import { BeVerifyOtpRequest } from "../request/be_verify_otp_request";
import { BePersonalAccessTokenResponse } from "../response/be_personal_access_token_response";

export interface BeAuthRepository {
  register(request: BeRegisterRequest): Promise<BeUserResponse>;
  login(request: BeLoginRequest): Promise<BePersonalAccessTokenResponse>;
  resendOtp(request: BeResendOtpRequest): Promise<BeUserResponse>;
  verifyOtp(request: BeVerifyOtpRequest): Promise<BeUserResponse>;
  getAccessToken(
    token: string,
  ): Promise<BePersonalAccessTokenResponse | null>;
}
