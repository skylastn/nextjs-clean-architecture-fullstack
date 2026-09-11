import { RowDataPacket } from "mysql2/promise";
import { BeUserRepository } from "@/feature/auth/domain/be/repository/be_user_repository";
import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { DB } from "@/shared/connection/db_injection";

const userTable = "`users`";

export class BeUserRepositoryImpl implements BeUserRepository {
  async getListUser(
    page: number = 1,
    perPage: number = 10,
  ): Promise<BeUserResponse[]> {
    const offset = (page - 1) * perPage;
    const users = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [perPage, offset],
    );
    return BeUserResponse.fromRows(users);
  }

  async getCountUser(): Promise<number> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM ${userTable}`,
    );
    return Number(rows[0]?.total ?? 0);
  }

  async getDetailUserById(id: string): Promise<BeUserResponse | null> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} WHERE id = ? LIMIT 1`,
      [id],
    );
    return rows.length === 0 ? null : BeUserResponse.fromRow(rows[0]);
  }
}
