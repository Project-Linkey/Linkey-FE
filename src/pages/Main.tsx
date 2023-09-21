import { Link } from "react-router-dom";
import Logo from "../components/common/Logo";
import Button from "../elements/Button";
import styled from "@emotion/styled/macro";

const Main = () => {
  return (
    <div>
      <Logo animationYN={true} />
      <ButtonWrap>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
        <Link to="/join">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrap>
    </div>
  );
};

const ButtonWrap = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 70px;
  margin: 0 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

export default Main;
