import React, { ReactNode } from "react";

import { ReactComponent as PhoneLayout } from "../../assets/layout/phoneLayout.svg";
import styled from "@emotion/styled/macro";

interface ContentType {
  children: ReactNode;
}

const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  & svg,
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .content {
    background: #dadada;
    width: 368px;
    height: 795px;
    border-radius: 40px;
  }

  @media screen and (max-width: 414px) {
    & svg {
      display: none;
    }

    .content {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }
`;

const Content: React.FC<ContentType> = ({ children }) => {
  return (
    <Wrap>
      <PhoneLayout />
      <div className="content">{children}</div>
    </Wrap>
  );
};

export default Content;
