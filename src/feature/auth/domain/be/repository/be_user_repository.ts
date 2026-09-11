import { BeUserResponse } from "../response/be_user_response";

export interface BeUserRepository {
  getListUser(page?: number, perPage?: number): Promise<BeUserResponse[]>;
  getCountUser(): Promise<number>;
  getDetailUserById(id: string): Promise<BeUserResponse | null>;
}
