import { useState } from "react";
import styled from "@emotion/styled/macro";
import { useMutation } from "react-query";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../hooks/format";
import Toast, { notify } from "../elements/Toast";
import Button from "../elements/Button";
import Logo from "../components/common/Logo";
import Input from "../elements/Input";
import ReactDatePicker from "../elements/DatePicker";
import ModalWindow from "../elements/Modal";

const Join = () => {
  const navigate = useNavigate();

  const [joinInfo, setJoinInfo] = useState({
    name: "",
    email: "",
    gender: "",
    birthday: "",
    category: [],
    profile: {},
    password: "",
    passwordAgain: "",
  });
  const [validation, setValidation] = useState({
    status: false,
    text: "",
    type: "",
  });
  const [categoryModalYN, setCategoryModalYN] = useState(false);

  const validationType = {
    regEmail: "이메일 형식에 맞춰 입력해주세요.",
    regPassword: "비밀번호를 정규식에 맞춰 입력해주세요.",
    differentPassword: "비밀번호가 서로 일치하지 않습니다.",
  };

  const { mutateAsync } = useMutation(login, {
    onSuccess: (res) => {
      // ! 추가 로직 구현 필요
      alert("성공 시 로직 구현 필요");

      setValidation({ status: false, text: "", type: "" });
    },
    onError: (error) => {
      console.error("Join Api Error : " + error);
      notify({
        type: "warning",
        text: "회원가입에 실패하였습니다.",
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

    setJoinInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submit = () => {
    const passwordCheck = validatePassword(joinInfo.password);
    const emailCheck = validateEmail(joinInfo.email);

    if (!passwordCheck) {
      setValidation({
        status: true,
        text: validationType.regPassword,
        type: "password",
      });
    } else if (joinInfo.password !== joinInfo.passwordAgain) {
      setValidation({
        status: true,
        text: validationType.differentPassword,
        type: "passwordAgain",
      });
    } else if (!emailCheck) {
      setValidation({
        status: true,
        text: validationType.differentPassword,
        type: "regEmail",
      });
    }

    mutateAsync(joinInfo);
  };

  const categoryModalHandler = (openYN: boolean) => {
    setCategoryModalYN(openYN);
  };

  return (
    <div>
      <Logo top="5%" />
      <Form>
        <Input
          type="name"
          name="name"
          placeholder="이름을 입력해주세요"
          value={joinInfo.name}
          onChange={inputHandler}
        />
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={joinInfo.email}
          onChange={inputHandler}
        />
        <ReactDatePicker />
        <div
          className="selectCategory"
          onClick={() => {
            categoryModalHandler(true);
          }}
        >
          관심사 +
        </div>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={joinInfo.password}
          onChange={inputHandler}
          onKeyUp={enter}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={joinInfo.password}
          onChange={inputHandler}
          onKeyUp={enter}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={joinInfo.password}
          onChange={inputHandler}
          onKeyUp={enter}
        />
        <Button
          disabled={
            joinInfo.name &&
            joinInfo.email &&
            joinInfo.password &&
            joinInfo.passwordAgain
              ? false
              : true
          }
          onClick={submit}
        >
          회원가입하기
        </Button>
      </Form>
      <Toast />
      {categoryModalYN && (
        <ModalWindow
          showYN={categoryModalYN}
          setShowYN={setCategoryModalYN}
          info={{ title: "관심사", body: "관심사 바디" }}
        />
      )}
    </div>
  );
};

const Form = styled.form`
  position: absolute;
  top: 300px;

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

  .selectCategory {
    width: 100%;
    height: 49px;
    margin-bottom: 10px;
    border-radius: 6px;
    background: yellow;
  }
`;

export default Join;
