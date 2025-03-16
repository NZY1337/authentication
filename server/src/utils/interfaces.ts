import { User } from "@prisma/client";

export interface UserWithoutSensitiveData extends Omit<User, "password" | "passwordToken" | "passwordTokenExpirationDate" | "verificationToken"> {}

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  domain?: string;
  sameSite?: "strict" | "lax" | "none";
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
  options: CookieOptions;
  refreshOptions: CookieOptions;
}

export interface SendEmailInterface {
  emailTo: string;
  subject: string;
  html: string;
}

export interface SendVerificationEmailInterface {
  name: string;
  emailTo: string;
  verificationToken: string;
  origin: string;
  type: "verification" | "resetPassword";
}

