import React, { ReactNode } from "react";

import { ReactComponent as PhoneLayout } from "../../assets/layout/phoneLayout.svg";

interface ContentType {
  children: ReactNode;
}

const Content: React.FC<ContentType> = () => {
  return (
    <div className="phoneLayout">
      sdsd
      <PhoneLayout />
    </div>
  );
};

export default Content;
