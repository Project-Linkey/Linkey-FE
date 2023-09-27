import axios from "axios";
import { JoinInfo, LoginInfo } from "../types/auth";

export const login = (data: LoginInfo) =>
  axios.post("/api/auth/signIn", { data: data });

export const join = (data: JoinInfo) =>
  axios.post("/api/auth/signUp", { data: data });
