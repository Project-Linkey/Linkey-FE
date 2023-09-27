export interface LoginInfo {
  email: string;
  password: string;
}

export interface JoinInfo {
  email: string;
  name: string;
  gender: string;
  birthday: Date;
  category: string[];
  profile: object;
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  gender: string;
  birthday: Date;
  category: string[];
  profileImg: "";
}
