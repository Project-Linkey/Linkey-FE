import { useState } from "react";
import styled from "@emotion/styled/macro";
import { useMutation } from "react-query";
import { join } from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../hooks/format";
import Toast, { notify } from "../elements/Toast";
import Button from "../elements/Button";
import Logo from "../components/common/Logo";
import Input from "../elements/Input";
import ReactDatePicker from "../elements/DatePicker";
import ModalWindow from "../elements/Modal";
import Form from "react-bootstrap/Form";
import { css } from "@emotion/react";
import { CATEGORY } from "../constants/category";
import { handleChangeFile } from "../hooks/profile";

const Join = () => {
  const navigate = useNavigate();

  const [joinInfo, setJoinInfo] = useState({
    name: "",
    email: "",
    gender: "",
    birthday: new Date(),
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
  const [selectCategory, setSelectCategory] = useState<string[]>([]);
  const [previewImg, setPreviewImg] = useState("");

  const validationType = {
    regEmail: "이메일 형식에 맞춰 입력해주세요.",
    regPassword: "비밀번호를 정규식에 맞춰 입력해주세요.",
    differentPassword: "비밀번호가 서로 일치하지 않습니다.",
  };

  const { mutateAsync } = useMutation(join, {
    onSuccess: (res) => {
      // ! 추가 로직 구현 필요
      alert("성공 시 로직 구현 필요");

      notify({ type: "success", text: "회원가입 되었습니다." });
      setTimeout(() => {
        navigate("/class/login");
      }, 1000);
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

  const selectCategorySubmit = (select: string[]) => {
    setJoinInfo((prev) => {
      return { ...prev, category: select };
    });
  };

  const categoryModalHandler = (openYN: boolean) => {
    setCategoryModalYN(openYN);
  };

  const selectCategoryItemHandler = (item: string) => {
    if (selectCategory.includes(item)) {
      setSelectCategory((prev) => {
        return prev.filter((category) => category !== item);
      });
      return;
    }

    if (selectCategory.length > 4) {
      alert("관심사는 최대 5개까지만 등록 가능합니다.");
      return;
    }

    setSelectCategory((prev) => {
      return [...prev, item];
    });
  };

  const selectGenderHandler = (gender: string) => {
    setJoinInfo((prev) => {
      return { ...prev, gender: gender };
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
      return;
    } else if (joinInfo.password !== joinInfo.passwordAgain) {
      setValidation({
        status: true,
        text: validationType.differentPassword,
        type: "passwordAgain",
      });
      return;
    } else if (!emailCheck) {
      setValidation({
        status: true,
        text: validationType.regEmail,
        type: "regEmail",
      });
      return;
    } else {
      setValidation({
        status: false,
        text: "",
        type: "",
      });
    }

    const info = {
      email: joinInfo.email,
      name: joinInfo.name,
      gender: joinInfo.gender,
      birthday: joinInfo.birthday,
      category: joinInfo.category,
      profile: joinInfo.profile,
      password: joinInfo.password,
    };

    mutateAsync(info);
  };

  return (
    <div>
      <Logo top="5%" />
      <FormWrap>
        <div className="profile">
          {previewImg ? (
            <img
              src={previewImg}
              width={130}
              height={130}
              alt="previewProfile"
            />
          ) : (
            <div className="base" />
          )}
          <div>
            <label htmlFor="file">
              <div className="btn-upload">파일 업로드하기</div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                handleChangeFile(
                  e,
                  (file) => {
                    setJoinInfo((prev) => {
                      return {
                        ...prev,
                        profile: file,
                      };
                    });
                  },
                  setPreviewImg
                );
              }}
            />
          </div>
        </div>
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
        {validation.type && validation.type === "regEmail" && (
          <span className="validation">{validation.text}</span>
        )}
        <div
          css={css`
            margin-bottom: 5px;
          `}
        >
          <Form.Check
            inline
            label="남자"
            name="gender"
            type="radio"
            id="man"
            onClick={() => {
              selectGenderHandler("man");
            }}
          />
          <Form.Check
            inline
            label="여자"
            name="gender"
            type="radio"
            id="woman"
            onClick={() => {
              selectGenderHandler("woman");
            }}
          />
        </div>
        <ReactDatePicker
          startDate={joinInfo.birthday}
          setStartDate={(date: Date) => {
            setJoinInfo((prev) => {
              return { ...prev, birthday: date };
            });
          }}
        />
        <div
          className="selectCategory"
          css={css`
            background: ${joinInfo.category.length > 0 ? "#fff" : "#fbfbfb"};
            color: ${joinInfo.category.length > 0 ? "black" : "gray"};
          `}
          onClick={() => {
            categoryModalHandler(true);
          }}
        >
          {joinInfo.category.length > 0
            ? joinInfo.category.join(", ")
            : "+ 관심사를 선택해주세요."}
        </div>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={joinInfo.password}
          onChange={inputHandler}
        />
        {validation.type && validation.type === "password" && (
          <span className="validation">{validation.text}</span>
        )}
        <Input
          type="password"
          name="passwordAgain"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          value={joinInfo.passwordAgain}
          onChange={inputHandler}
          onKeyUp={enter}
        />
        {validation.type && validation.type === "passwordAgain" && (
          <span className="validation">{validation.text}</span>
        )}
        <Button
          disabled={
            joinInfo.name &&
            joinInfo.email &&
            joinInfo.gender &&
            joinInfo.birthday &&
            joinInfo.category.length > 0 &&
            joinInfo.password &&
            joinInfo.passwordAgain
              ? false
              : true
          }
          onClick={submit}
        >
          회원가입하기
        </Button>
      </FormWrap>
      <Toast />
      {categoryModalYN && (
        <ModalWindow
          showYN={categoryModalYN}
          setShowYN={setCategoryModalYN}
          info={{ title: "관심사", buttonText: "저장" }}
          moreBtn={true}
          submit={() => {
            selectCategorySubmit(selectCategory);
          }}
          close={() => {
            setSelectCategory([]);
          }}
        >
          {CATEGORY.map((item) => {
            return (
              <div
                key={item}
                css={css`
                  background: ${selectCategory.includes(item)
                    ? "var(--base-color) !important"
                    : "white"};
                  border: ${selectCategory.includes(item)
                    ? "2px solid var(--base-color)"
                    : "2px solid var(--accent-color)"};
                  color: ${selectCategory.includes(item) ? "white" : "black"};
                  border-radius: 6px;
                  margin: 10px 0;
                  padding: 12px 10px 8px;

                  &:hover {
                    background: var(--accent-color);
                    color: white;
                  }
                `}
                onClick={() => {
                  selectCategoryItemHandler(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </ModalWindow>
      )}
    </div>
  );
};

const FormWrap = styled.form`
  position: absolute;
  top: 250px;
  padding-bottom: 50px;

  .profile {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    margin-bottom: 60px;

    img,
    .base {
      border-radius: 500px;
      margin-bottom: 10px;
    }

    .base {
      width: 130px;
      height: 130px;
      background: #e1e1e1;
    }

    .btn-upload {
      width: 130px;
      height: 30px;
      background: #fff;
      border: 2px solid var(--main-color);
      border-radius: 10px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: var(--main-color);
        color: #fff;
      }
    }

    #file {
      display: none;
    }
  }

  .validation {
    margin-bottom: 10px;
  }

  .naverLogin {
    background: #232323;
  }

  .kakaoLogin {
    background: #ffe402;
    color: black;
  }

  .selectCategory {
    width: 100%;
    max-width: 338px;
    height: 49px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 13px 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 414px) {
      max-width: 100%;
    }
  }
`;

export default Join;
