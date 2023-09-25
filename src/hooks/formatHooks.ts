import { regEmail, regPassword } from "../utils/format";

export const validatePassword = (password: string) =>
  regPassword.test(password);

export const validateEmail = (email: string) => regEmail.test(email);
