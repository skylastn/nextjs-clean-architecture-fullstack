import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export type FeUserResponseWrapper = {
  status?: boolean;
  message?: string;
  data?: FeUserResponse;
};

export class FeUserResponse {
  id?: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  email_verified_at?: Date | null;
  phone_verified_at?: Date | null;

  constructor(data?: FeUserResponse) {
    this.id = data?.id;
    this.name = data?.name;
    this.phone = data?.phone;
    this.email = data?.email;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
    this.email_verified_at = data?.email_verified_at;
    this.phone_verified_at = data?.phone_verified_at;
  }

  static Convert = ConvertResponse<FeUserResponseWrapper>();
}
