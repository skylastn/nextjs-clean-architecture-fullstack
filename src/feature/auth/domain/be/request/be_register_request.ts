export class BeRegisterRequest {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;

  constructor(data?: BeRegisterRequest) {
    this.name = data?.name;
    this.phone = data?.phone;
    this.email = data?.email;
    this.password = data?.password;
  }
}
