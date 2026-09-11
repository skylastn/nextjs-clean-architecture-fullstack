export class SessionData {
  private setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  }

  private getItem(key: string) {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  }

  saveToken(token: string): void {
    this.setItem("token", token);
  }

  get token(): string | null {
    return this.getItem("token");
  }

  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
  }
}
