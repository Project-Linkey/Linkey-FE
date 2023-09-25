import { useEffect, useState } from "react";

import Logo from "../components/common/Logo";
import Button from "../elements/Button";
import Input from "../elements/Input";

import styled from "@emotion/styled/macro";
import { useMutation } from "react-query";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/atom";

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
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const linkeyUserInfo = sessionStorage.getItem("linkeyUserInfo");

    if (linkeyUserInfo) {
      navigate("/class/commend");
    }
  }, []);

  const { mutateAsync } = useMutation(login, {
    onSuccess: (res) => {
      // ! 추가 로직 구현 필요
      alert("성공 시 로직 구현 필요");
      setValidation({ status: false, text: "" });

      setUserInfo(res.data);

      if (loginInfo.keepLoggedIn) {
        sessionStorage.setItem("linkeyUserInfo", res.data);
      }

      navigate("/class/commend");
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
    mutateAsync(loginInfo);
  };

  return (
    <div>
      <Logo top="5%" />
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
        <br />
        <div className="keepLoggedIn">
          <input id="checkbox" type="checkbox" />
          <label
            htmlFor="checkbox"
            onClick={() => {
              setLoginInfo((prev) => {
                return { ...prev, keepLoggedIn: !prev.keepLoggedIn };
              });
            }}
          />
          <span>로그인 유지</span>
        </div>
        <Button
          disabled={loginInfo.email && loginInfo.password ? false : true}
          onClick={submit}
        >
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

  .keepLoggedIn {
    margin: 5px 0 7px;
    position: relative;

    span {
      font-size: 0.8rem;
      position: absolute;
      top: 1.5px;
    }
  }
`;

export default Login;
