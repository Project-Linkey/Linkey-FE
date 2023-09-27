import React, { ReactNode } from "react";

import { ReactComponent as PhoneLayoutSvg } from "../../assets/layout/phoneLayout.svg";
import { ReactComponent as BackSvg } from "../../assets/common/back.svg";
import styled from "@emotion/styled/macro";
import { useLocation, useNavigate } from "react-router-dom";

interface ContentType {
  children: ReactNode;
}

const Content: React.FC<ContentType> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Wrap>
      <div className="background" />
      <PhoneLayoutSvg className="phoneLayoutSvg" />
      <div className="children">
        {location.pathname !== "/" && (
          <BackSvg
            className="backSvg"
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        {children}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;

  .backSvg {
    position: absolute;
    z-index: 5;
    top: 15px;
    left: 5px;
  }

  .background {
    background: var(--main-color);
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  .phoneLayoutSvg,
  .children {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .children {
    background: white;
    width: 368px;
    height: 795px;
    border-radius: 40px;
    z-index: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media screen and (max-width: 414px) {
    & .phoneLayoutSvg {
      display: none;
    }

    .children {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }
`;

export default Content;
