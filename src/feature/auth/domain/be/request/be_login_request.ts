export class BeLoginRequest {
  username?: string;
  password?: string;

  constructor(data?: BeLoginRequest) {
    this.username = data?.username;
    this.password = data?.password;
  }
}
