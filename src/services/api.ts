import axios from "axios";
import { LoginInfo } from "../types/types";

export const login = (data: LoginInfo) =>
  axios.post("/api/auth/signIn", { data: data });
