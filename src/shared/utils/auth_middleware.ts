import { NextApiRequest, NextApiResponse } from "next";
import { BeAuthService } from "@/feature/auth/application/be/be_auth_service";
import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";

export interface AuthedNextApiRequest extends NextApiRequest {
  user?: BeUserResponse | null;
}

export async function withAuth(
  req: AuthedNextApiRequest,
  res: NextApiResponse,
  next: () => Promise<unknown> | unknown,
) {
  const authorization = req.headers["authorization"];
  const bearer = Array.isArray(authorization) ? authorization[0] : authorization;
  const legacy = req.headers["token"];
  const legacyToken = Array.isArray(legacy) ? legacy[0] : legacy;

  const token = bearer?.startsWith("Bearer ")
    ? bearer.replace("Bearer ", "")
    : legacyToken;

  if (!token) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  const accessToken = await BeAuthService.getAccessToken(token);

  if (!accessToken) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  req.user = accessToken.user;
  await next();
}

export default withAuth;
