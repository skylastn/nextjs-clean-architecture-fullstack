import { BaseResponse } from "@/shared/domain/model/response/base_response";
import { BeProductResponse } from "./be_product_response";

export type BeProductRuleResponseWrapper = BaseResponse<BeProductRuleResponse>;

export class BeProductRuleResponse {
  id?: number;
  user_id?: number;
  product_code?: string;
  expired_at?: Date | null;
  product?: BeProductResponse;

  constructor(data?: BeProductRuleResponse) {
    this.id = data?.id;
    this.user_id = data?.user_id;
    this.product_code = data?.product_code;
    this.expired_at = data?.expired_at;
    this.product = data?.product;
  }
}
