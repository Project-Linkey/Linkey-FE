import axios from "axios";
import { UserInfo } from "../types/user";

export const axiosHeaderCustomers = (userInfo: UserInfo) => {
  axios.defaults.headers.manager = JSON.stringify(userInfo);
};
