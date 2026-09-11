import { NextApiRequest, NextApiResponse } from "next";
import { AuthController } from "@/feature/auth/presentation/be/be_auth_controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return AuthController.resendOtp(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
