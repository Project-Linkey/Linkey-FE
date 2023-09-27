import { atom, selector } from "recoil";
import { UserInfo } from "../types/types";

export const userInfoState = atom<UserInfo>({
  key: "userInfo",
  default: {
    id: 0,
    email: "",
    name: "",
    gender: "",
    category: [],
    birthday: new Date(),
    profileImg: "",
  },
});

export const getUserInfoState = selector<UserInfo>({
  key: "userInfoState",
  get: ({ get }) => {
    return get(userInfoState);
  },
});
