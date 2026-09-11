export enum BeResendOtpType {
  email_verification = "email_verification",
  forgot_password = "forgot_password",
}

export namespace BeResendOtpType {
  export function from(value: string): BeResendOtpType {
    switch (value) {
      case "email_verification":
        return BeResendOtpType.email_verification;
      case "forgot_password":
        return BeResendOtpType.forgot_password;
      default:
        return BeResendOtpType.email_verification;
    }
  }

  export function subject(type: BeResendOtpType): string {
    switch (type) {
      case BeResendOtpType.email_verification:
        return "Verifikasi Email";
      case BeResendOtpType.forgot_password:
        return "Forgot Password";
      default:
        return "Verifikasi Email";
    }
  }
}
