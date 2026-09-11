import { NextApiResponse } from "next";
import { BeUserService } from "@/feature/auth/application/be/be_user_service";
import { AuthedNextApiRequest } from "@/shared/utils/auth_middleware";
import { ApiResponse } from "@/shared/utils/api_response";

export namespace UserController {
  export async function getListUser(
    req: AuthedNextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      const { page, perPage } = req.query;
      const currentPage = parseInt((page as string) || "1");
      const perPageValue = parseInt((perPage as string) || "10");
      const result = await BeUserService.getListUser(currentPage, perPageValue);

      return ApiResponse.pagination(res, result.data, {
        currentPage: currentPage,
        perPage: perPageValue,
        total: result.total,
      });
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }

  export async function me(req: AuthedNextApiRequest, res: NextApiResponse) {
    try {
      return ApiResponse.success(res, req.user);
    } catch (err) {
      return ApiResponse.failed(res, null, ApiResponse.catchError(err));
    }
  }
}
