import React, { ReactNode } from "react";

import { ReactComponent as PhoneLayoutSvg } from "../../assets/layout/phoneLayout.svg";
import styled from "@emotion/styled/macro";

interface ContentType {
  children: ReactNode;
}

const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  .background {
    background: var(--main-color);
    width: 100vw;
    height: 100vh;
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

const Content: React.FC<ContentType> = ({ children }) => {
  return (
    <Wrap>
      <div className="background" />
      <PhoneLayoutSvg className="phoneLayoutSvg" />
      <div className="children">{children}</div>
    </Wrap>
  );
};

export default Content;
