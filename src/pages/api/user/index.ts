import { NextApiResponse } from "next";
import { UserController } from "@/feature/auth/presentation/be/be_user_controller";
import withAuth, {
  AuthedNextApiRequest,
} from "@/shared/utils/auth_middleware";

export default async function handler(
  req: AuthedNextApiRequest,
  res: NextApiResponse,
) {
  await withAuth(req, res, async () => {
    switch (req.method) {
      case "GET":
        return UserController.getListUser(req, res);
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
