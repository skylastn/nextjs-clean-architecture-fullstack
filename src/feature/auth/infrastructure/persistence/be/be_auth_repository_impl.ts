import bcrypt from "bcrypt";
import sign from "jwt-encode";
import { RowDataPacket } from "mysql2/promise";
import { BeResendOtpType } from "@/feature/auth/domain/be/enum/be_resend_otp_type";
import { BeAuthRepository } from "@/feature/auth/domain/be/repository/be_auth_repository";
import { BeLoginRequest } from "@/feature/auth/domain/be/request/be_login_request";
import { BeRegisterRequest } from "@/feature/auth/domain/be/request/be_register_request";
import { BeResendOtpRequest } from "@/feature/auth/domain/be/request/be_resend_otp_request";
import { BeVerifyOtpRequest } from "@/feature/auth/domain/be/request/be_verify_otp_request";
import { BePersonalAccessTokenResponse } from "@/feature/auth/domain/be/response/be_personal_access_token_response";
import { BeUserResponse } from "@/feature/auth/domain/be/response/be_user_response";
import { DB } from "@/shared/connection/db_injection";
import { Mail } from "@/shared/connection/mail";
import { Helper } from "@/shared/utils/utility/helper";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const userTable = "`users`";
const tokenTable = "`personal_access_token`";

export class BeAuthRepositoryImpl implements BeAuthRepository {
  constructor(private readonly mail = new Mail()) {}

  async register(request: BeRegisterRequest): Promise<BeUserResponse> {
    const existing = await this.getDetailUserByEmailOrPhone(
      request.email ?? "",
      request.phone ?? "",
    );
    if (existing) {
      throw new Error("User Already Exists");
    }

    const hash = await bcrypt.hash(request.password ?? "", Helper.saltRounds);
    const result = await this.createUser(
      request.name ?? "",
      request.phone ?? "",
      request.email ?? "",
      hash,
    );

    const verificationCode = Helper.generateRandomString(6).toUpperCase();
    await this.updateVerificationUser(
      result.id ?? "",
      true,
      false,
      verificationCode,
    );
    await this.mail.send(
      request.email ?? "",
      BeResendOtpType.subject(BeResendOtpType.email_verification),
      "Verification Code : " + verificationCode,
    );

    return result;
  }

  async login(
    request: BeLoginRequest,
  ): Promise<BePersonalAccessTokenResponse> {
    const username = request.username ?? "";
    const isEmail = Helper.isEmail(username);
    const user = isEmail
      ? await this.getDetailUserByEmail(username)
      : await this.getDetailUserByPhone(username);

    if (user == null) {
      throw new Error("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(
      request.password ?? "",
      user.password ?? "",
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }
    if (user.email_verified_at == null) {
      throw new Error("Email Not Verified");
    }

    return await this.generateToken(user.id ?? "", user.name ?? "");
  }

  async resendOtp(request: BeResendOtpRequest): Promise<BeUserResponse> {
    const type = BeResendOtpType.from(request.type ?? "");
    const username = request.username ?? "";
    const isEmail = Helper.isEmail(username);
    if (!isEmail) {
      throw new Error("Phone Not Supported Yet");
    }

    const result = await this.getDetailUserByEmail(username);
    if (result == null) {
      throw new Error("User Not Found");
    }

    const verificationCode = Helper.generateRandomString(6).toUpperCase();
    await this.updateVerificationUser(
      result.id ?? "",
      true,
      false,
      verificationCode,
    );
    await this.mail.send(
      username,
      BeResendOtpType.subject(type),
      "Verification Code : " + verificationCode,
    );

    return result;
  }

  async verifyOtp(request: BeVerifyOtpRequest): Promise<BeUserResponse> {
    const type = BeResendOtpType.from(request.type ?? "");
    const username = request.username ?? "";
    const isEmail = Helper.isEmail(username);
    if (!isEmail) {
      throw new Error("Phone Not Supported Yet");
    }

    const result = await this.getDetailUserByEmail(username);
    if (result == null) {
      throw new Error("User Not Found");
    }

    switch (type) {
      case BeResendOtpType.email_verification: {
        const isValid = result.email_verification_code == request.code;
        if (!isValid) {
          throw new Error("Invalid verification code");
        }
        await this.updateVerificationUser(result.id ?? "", isEmail, true, null);
        break;
      }
      case BeResendOtpType.forgot_password: {
        const isValid = result.other_verification_code == request.code;
        if (!isValid) {
          throw new Error("Invalid verification code");
        }
        if (!request.password || !request.repeat_password) {
          throw new Error("Please enter password");
        }
        if (request.password !== request.repeat_password) {
          throw new Error("Password not match");
        }
        await this.changePassword(
          result.id ?? "",
          await bcrypt.hash(request.password, Helper.saltRounds),
          true,
        );
        break;
      }
      default:
        break;
    }

    return result;
  }

  async getAccessToken(
    token: string,
  ): Promise<BePersonalAccessTokenResponse | null> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT a.*,
              u.id AS user_id_join,
              u.name AS user_name_join,
              u.email AS user_email_join,
              u.phone AS user_phone_join,
              u.password AS user_password_join,
              u.other_verification_code,
              u.email_verification_code,
              u.phone_verification_code,
              u.created_at AS user_created_at_join,
              u.updated_at AS user_updated_at_join,
              u.email_verified_at,
              u.phone_verified_at
       FROM ${tokenTable} a
       LEFT JOIN ${userTable} u ON a.user_id = u.id
       WHERE a.token = ? LIMIT 1`,
      [token],
    );

    if (rows.length === 0) {
      return null;
    }

    return BePersonalAccessTokenResponse.fromRow(rows[0]);
  }

  private async getDetailUserByEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<BeUserResponse | null> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} WHERE email = ? OR phone = ? LIMIT 1`,
      [email, phone],
    );
    return rows.length === 0 ? null : BeUserResponse.fromRow(rows[0]);
  }

  private async getDetailUserByEmail(
    email: string,
  ): Promise<BeUserResponse | null> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} WHERE email = ? LIMIT 1`,
      [email],
    );
    return rows.length === 0 ? null : BeUserResponse.fromRow(rows[0]);
  }

  private async getDetailUserByPhone(
    phone: string,
  ): Promise<BeUserResponse | null> {
    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} WHERE phone = ? LIMIT 1`,
      [phone],
    );
    return rows.length === 0 ? null : BeUserResponse.fromRow(rows[0]);
  }

  private async createUser(
    name: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<BeUserResponse> {
    await DB.insert(userTable, {
      id: DB.uuid(),
      name: name,
      phone: phone,
      email: email,
      password: password,
      created_at: DB.now(),
      updated_at: DB.now(),
      other_verification_code: null,
      email_verification_code: null,
      phone_verification_code: null,
      email_verified_at: null,
      phone_verified_at: null,
    });

    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${userTable} WHERE email = ? LIMIT 1`,
      [email],
    );
    return BeUserResponse.fromRow(rows[0]);
  }

  private async updateVerificationUser(
    id: string,
    isEmail: boolean,
    isVerified: boolean,
    code: string | null,
  ): Promise<boolean> {
    const updateData: Record<string, unknown> = {
      updated_at: DB.now(),
    };

    if (isEmail) {
      updateData.email_verified_at = isVerified ? DB.now() : null;
      updateData.email_verification_code = code;
    } else {
      updateData.phone_verified_at = isVerified ? DB.now() : null;
      updateData.phone_verification_code = code;
    }

    await DB.update(userTable, updateData, `id = ?`, [id]);
    return true;
  }

  private async updateOtherVerification(
    id: string,
    code: string | null,
  ): Promise<boolean> {
    await DB.update(
      userTable,
      {
        other_verification_code: code,
        updated_at: DB.now(),
      },
      `id = ?`,
      [id],
    );
    return true;
  }

  private async changePassword(
    id: string,
    password: string,
    isUpdateVerification: boolean,
  ): Promise<boolean> {
    if (isUpdateVerification) {
      await this.updateOtherVerification(id, null);
    }

    await DB.update(
      userTable,
      {
        password: password,
        updated_at: DB.now(),
      },
      `id = ?`,
      [id],
    );

    return true;
  }

  private async generateToken(
    user_id: string,
    name: string,
  ): Promise<BePersonalAccessTokenResponse> {
    const token = sign(
      { user_id: user_id, date: new Date().toISOString() },
      JWT_SECRET,
    );

    if (!token) {
      throw new Error("Creating Token Error");
    }

    await DB.insert(tokenTable, {
      id: DB.uuid(),
      token: token,
      user_id: user_id,
      name: name,
      created_at: DB.now(),
      updated_at: DB.now(),
    });

    const rows = await DB.select<RowDataPacket[]>(
      `SELECT * FROM ${tokenTable} WHERE token = ? LIMIT 1`,
      [token],
    );

    return BePersonalAccessTokenResponse.fromRow(rows[0]);
  }
}
