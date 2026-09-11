export class BeVerifyOtpRequest {
  type?: string;
  username?: string;
  code?: string;
  password?: string;
  repeat_password?: string;

  constructor(data?: BeVerifyOtpRequest) {
    this.type = data?.type;
    this.username = data?.username;
    this.code = data?.code;
    this.password = data?.password;
    this.repeat_password = data?.repeat_password;
  }
}
