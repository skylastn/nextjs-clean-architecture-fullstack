import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { FeUserResponse } from "../response/fe_user_response";

export interface FeUserRepository {
  me(): Promise<Either<ResponseModel, FeUserResponse>>;
}
