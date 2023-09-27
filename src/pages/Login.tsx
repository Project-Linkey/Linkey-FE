import { useState } from "react";

import Logo from "../components/common/Logo";
import Button from "../elements/Button";
import Input from "../elements/Input";

import styled from "@emotion/styled/macro";
import { useMutation } from "react-query";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/atom";
import Toast, { notify } from "../elements/Toast";

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });
  const [validation, setValidation] = useState({
    status: false,
    text: "",
  });
  const [_, setUserInfo] = useRecoilState(userInfoState);

  const { mutateAsync } = useMutation(login, {
    onSuccess: (res) => {
      // ! 추가 로직 구현 필요
      alert("성공 시 로직 구현 필요");

      setUserInfo(res.data);

      notify({ type: "success", text: "로그인 되었습니다." });
      setTimeout(() => {
        navigate("/class/commend");
      }, 1000);
    },
    onError: (error) => {
      console.error("Login Api Error : " + error);
      setValidation({
        status: true,
        text: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    },
  });

  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submit = () => {
    setValidation({ status: false, text: "" });

    mutateAsync(loginInfo);
  };

  return (
    <div>
      <Logo top="15%" />
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={loginInfo.email}
          onChange={inputHandler}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={loginInfo.password}
          onChange={inputHandler}
          onKeyUp={enter}
        />
        {validation.status && (
          <span className="validation">{validation.text}</span>
        )}
        <Button
          disabled={loginInfo.email && loginInfo.password ? false : true}
          onClick={submit}
        >
          로그인하기
        </Button>
        <hr />
        <Button className="naverLogin">네이버로 로그인</Button>
        <Button className="kakaoLogin">카카오로 로그인</Button>
      </Form>
      <Toast />
    </div>
  );
};

const Form = styled.form`
  position: absolute;
  top: 370px;

  .validation {
    margin-bottom: 10px;
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
