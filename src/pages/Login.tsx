import { useState } from "react";

import Logo from "../components/common/Logo";
import Button from "../elements/Button";
import Input from "../elements/Input";

import styled from "@emotion/styled/macro";

interface LoginInfo {
  email: string;
  password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <Logo top="5%" />
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="아이디(이메일) 입력해주세요"
          value={loginInfo.email}
          onChange={inputHandler}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={loginInfo.password}
          onChange={inputHandler}
        />
        <span>아이디 또는 비밀번호가 일치하지 않습니다.</span>
        <br />
        <div>
          <input type="checkbox" />
          로그인 유지
        </div>
        <Button disabled={loginInfo.email && loginInfo.password ? false : true}>
          로그인
        </Button>
        <hr />
        <Button className="naverLogin">네이버로 로그인</Button>
        <Button className="kakaoLogin">카카오로 로그인</Button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  position: absolute;
  top: 300px;

  hr {
    margin-top: 15px;
  }

  .naverLogin {
    background: #2db400;
  }

  .kakaoLogin {
    background: #ffe402;
    color: black;
  }
`;

export default Login;
