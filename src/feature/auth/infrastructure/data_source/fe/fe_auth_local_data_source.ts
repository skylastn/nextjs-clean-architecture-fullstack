import { SessionData } from "@/shared/constant/session";

export class FeAuthLocalDataSource {
  constructor(private localDb = new SessionData()) {}

  async saveToken(token: string): Promise<void> {
    this.localDb.saveToken(token);
  }

  async logout(): Promise<void> {
    this.localDb.removeToken();
  }

  get isLogin(): boolean {
    return !!this.localDb.token;
  }
}
