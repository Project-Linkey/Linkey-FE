import axios from "axios";
import { UserInfo } from "../types/types";

export const axiosHeaderCustomers = (userInfo: UserInfo) => {
  axios.defaults.headers.manager = JSON.stringify(userInfo);
};
