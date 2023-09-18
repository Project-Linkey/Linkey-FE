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
    background: white;
    width: 365px;
    height: 793px;
    border-radius: 35px;
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
