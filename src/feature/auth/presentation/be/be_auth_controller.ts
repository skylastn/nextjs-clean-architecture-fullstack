import { NextApiRequest, NextApiResponse } from "next";
import { BeAuthService } from "@/feature/auth/application/be/be_auth_service";
import { BeLoginRequest } from "@/feature/auth/domain/be/request/be_login_request";
import { BeRegisterRequest } from "@/feature/auth/domain/be/request/be_register_request";
import { BeResendOtpRequest } from "@/feature/auth/domain/be/request/be_resend_otp_request";
import { BeVerifyOtpRequest } from "@/feature/auth/domain/be/request/be_verify_otp_request";
import { ApiResponse } from "@/shared/utils/api_response";

export namespace AuthController {
  export async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const request = new BeLoginRequest(req.body);
      const result = await BeAuthService.login(request);
      return ApiResponse.success(res, result);
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }

  export async function register(req: NextApiRequest, res: NextApiResponse) {
    try {
      const request = new BeRegisterRequest(req.body);
      const result = await BeAuthService.register(request);
      return ApiResponse.success(res, result);
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }

  export async function resendOtp(req: NextApiRequest, res: NextApiResponse) {
    try {
      const request = new BeResendOtpRequest(req.body);
      await BeAuthService.resendOtp(request);
      return ApiResponse.success(res, [], "Success Sending Otp");
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }

  export async function verifyOtp(req: NextApiRequest, res: NextApiResponse) {
    try {
      const request = new BeVerifyOtpRequest(req.body);
      await BeAuthService.verifyOtp(request);
      return ApiResponse.success(res, [], "Success Verify Otp");
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }
}
