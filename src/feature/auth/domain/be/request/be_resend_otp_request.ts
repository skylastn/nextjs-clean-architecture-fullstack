export class BeResendOtpRequest {
  type?: string;
  username?: string;

  constructor(data?: BeResendOtpRequest) {
    this.type = data?.type;
    this.username = data?.username;
  }
}
