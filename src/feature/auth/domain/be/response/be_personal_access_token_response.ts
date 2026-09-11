import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { BaseModelResponse } from "@/shared/domain/model/response/base_model_response";
import { BaseResponse } from "@/shared/domain/model/response/base_response";
import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export type BePersonalAccessTokenResponseWrapper =
  BaseResponse<BePersonalAccessTokenResponse>;

type Row = Record<string, unknown>;

export class BePersonalAccessTokenResponse extends BaseModelResponse {
  user_id?: string | null;
  token?: string | null;
  name?: string | null;
  user?: BeUserResponse | null;

  constructor(data?: BePersonalAccessTokenResponse) {
    super();
    this.id = data?.id;
    this.user_id = data?.user_id;
    this.token = data?.token;
    this.name = data?.name;
    this.user = data?.user;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
  }

  static fromRow(row?: Row | null): BePersonalAccessTokenResponse {
    return new BePersonalAccessTokenResponse({
      id: row?.id as string | undefined,
      user_id: row?.user_id as string | undefined,
      token: row?.token as string | undefined,
      name: row?.name as string | undefined,
      user: row?.user_id_join
        ? BeUserResponse.fromRow({
            id: row.user_id_join,
            name: row.user_name_join,
            email: row.user_email_join,
            phone: row.user_phone_join,
            password: row.user_password_join,
            other_verification_code: row.user_other_verification_code,
            email_verification_code: row.user_email_verification_code,
            phone_verification_code: row.user_phone_verification_code,
            created_at: row.user_created_at_join,
            updated_at: row.user_updated_at_join,
            email_verified_at: row.user_email_verified_at,
            phone_verified_at: row.user_phone_verified_at,
          })
        : null,
      created_at: row?.created_at as Date | undefined,
      updated_at: row?.updated_at as Date | undefined,
    });
  }

  static fromRows(rows: Row[]): BePersonalAccessTokenResponse[] {
    return rows.map((row) => BePersonalAccessTokenResponse.fromRow(row));
  }

  static Convert = ConvertResponse<BePersonalAccessTokenResponseWrapper>();
}
