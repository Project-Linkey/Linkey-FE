import { ReactNode, useState } from "react";
import styled from "@emotion/styled/macro";

interface Props {
  children: ReactNode;
  duplicateClickPrevention?: boolean;
  disabled?: boolean;
  _onClick?: () => {};
  _onKeyUp?: () => {};
}

const Button = ({
  children,
  duplicateClickPrevention = false,
  disabled = false,
  _onClick,
  _onKeyUp,
}: Props) => {
  const [requestingApi, setRequestingApi] = useState(false);

  return (
    <Wrap
      onClick={
        Boolean(duplicateClickPrevention)
          ? () => {
              if (requestingApi) return;

              setRequestingApi(true);
              setTimeout(() => {
                _onClick && _onClick();
                setRequestingApi(false);
              }, 1000);
            }
          : _onClick
      }
      onKeyUp={_onKeyUp}
      disabled={requestingApi || disabled}
    >
      {children}
    </Wrap>
  );
};

const Wrap = styled.button`
  width: calc(100% - 30px);
  height: 50px;
  border-radius: 15px;
  border: none;

  background: var(--main-color);
  color: white;

  &:hover {
    background: var(--base-color);
  }

  &:disabled {
    background: var(--accent-color);
  }
`;

export default Button;
