import { BaseModelResponse } from "@/shared/domain/model/response/base_model_response";
import { BaseResponse } from "@/shared/domain/model/response/base_response";
import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export type BeUserResponseWrapper = BaseResponse<BeUserResponse>;

type Row = Record<string, unknown>;

export class BeUserResponse extends BaseModelResponse {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  password?: string | null;
  other_verification_code?: string | null;
  email_verification_code?: string | null;
  phone_verification_code?: string | null;
  email_verified_at?: Date | null;
  phone_verified_at?: Date | null;

  constructor(data?: BeUserResponse) {
    super();
    this.id = data?.id;
    this.name = data?.name;
    this.phone = data?.phone;
    this.email = data?.email;
    this.password = data?.password;
    this.other_verification_code = data?.other_verification_code;
    this.email_verification_code = data?.email_verification_code;
    this.phone_verification_code = data?.phone_verification_code;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
    this.email_verified_at = data?.email_verified_at;
    this.phone_verified_at = data?.phone_verified_at;
  }

  static fromRow(row?: Row | null): BeUserResponse {
    return new BeUserResponse({
      id: row?.id as string | undefined,
      name: row?.name as string | null,
      email: row?.email as string | null,
      phone: row?.phone as string | null,
      password: row?.password as string | null,
      other_verification_code: row?.other_verification_code as string | null,
      email_verification_code: row?.email_verification_code as string | null,
      phone_verification_code: row?.phone_verification_code as string | null,
      created_at: row?.created_at as Date | undefined,
      updated_at: row?.updated_at as Date | undefined,
      email_verified_at: row?.email_verified_at as Date | null,
      phone_verified_at: row?.phone_verified_at as Date | null,
    });
  }

  static fromRows(rows: Row[]): BeUserResponse[] {
    return rows.map((row) => BeUserResponse.fromRow(row));
  }

  static Convert = ConvertResponse<BeUserResponseWrapper>();
}
