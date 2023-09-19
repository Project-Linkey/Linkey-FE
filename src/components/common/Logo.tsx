import { ReactComponent as LogoSvg } from "../../assets/logo/logo.svg";
import styled from "@emotion/styled/macro";

const Logo = () => {
  const Logo = styled.div`
    width: 100%;
    height: 200px;
    position: absolute;
    text-align: center;
    top: 20%;

    .logoSvg {
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      animation: showSvg 1.5s forwards 1;
    }

    p {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      margin: 0;
      color: var(--main-color);
      font-weight: 600;
      animation: showP 2s forwards 1;
    }

    @keyframes showSvg {
      0% {
        transform: translate(-50%, -90%);
        opacity: 0;
      }

      100% {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }

    @keyframes showP {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  `;

  return (
    <Logo>
      <LogoSvg className="logoSvg" width={200} />
      <p>새로운 연결, 더 넓은 세상.</p>
    </Logo>
  );
};

export default Logo;
