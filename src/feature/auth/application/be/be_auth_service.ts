import { BeAuthRepository } from "@/feature/auth/domain/be/repository/be_auth_repository";
import { BeLoginRequest } from "@/feature/auth/domain/be/request/be_login_request";
import { BeRegisterRequest } from "@/feature/auth/domain/be/request/be_register_request";
import { BeResendOtpRequest } from "@/feature/auth/domain/be/request/be_resend_otp_request";
import { BeVerifyOtpRequest } from "@/feature/auth/domain/be/request/be_verify_otp_request";
import { BePersonalAccessTokenResponse } from "@/feature/auth/domain/be/response/be_personal_access_token_response";
import { BeAuthRepositoryImpl } from "@/feature/auth/infrastructure/persistence/be/be_auth_repository_impl";
import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";

export namespace BeAuthService {
  const repo: BeAuthRepository = new BeAuthRepositoryImpl();

  export async function register(
    request: BeRegisterRequest,
  ): Promise<BeUserResponse> {
    return await repo.register(request);
  }

  export async function login(
    request: BeLoginRequest,
  ): Promise<BePersonalAccessTokenResponse> {
    return await repo.login(request);
  }

  export async function resendOtp(
    request: BeResendOtpRequest,
  ): Promise<BeUserResponse> {
    return await repo.resendOtp(request);
  }

  export async function verifyOtp(
    request: BeVerifyOtpRequest,
  ): Promise<BeUserResponse> {
    return await repo.verifyOtp(request);
  }

  export async function getAccessToken(
    token: string,
  ): Promise<BePersonalAccessTokenResponse | null> {
    return await repo.getAccessToken(token);
  }
}
