import { useState } from "react";

import { useMutation } from "react-query";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../hooks/formatHooks";
import Toast, { notify } from "../elements/Toast";
import { toast } from "react-toastify";
import Button from "../elements/Button";

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

  return (
    <div>
      <Button
        onClick={() => {
          notify({
            type: "warning",
            text: "회원가입에 실패하였습니다.",
          });
        }}
      >
        토스트
      </Button>
      <Toast />
    </div>
  );
};

export default Join;
