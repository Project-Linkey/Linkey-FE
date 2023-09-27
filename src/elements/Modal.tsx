import { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import { css } from "@emotion/react";

interface Props {
  showYN: boolean;
  setShowYN: Function;
  info: {
    title: string;
    buttonText?: string;
  };
  children: React.ReactNode;
  moreBtn?: Boolean;
  submit: Function;
  close: Function;
}

function ModalWindow({
  showYN,
  setShowYN,
  info,
  children,
  submit,
  close,
  moreBtn = false,
}: Props) {
  useEffect(() => {
    setShowYN(showYN);
  }, [showYN]);

  const handleClose = () => {
    setShowYN(false);
  };

  return (
    <Modal size="sm" show={showYN} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{info.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        css={css`
          max-height: 400px;
          overflow-y: scroll;
        `}
      >
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn_close"
          variant="secondary"
          onClick={() => {
            close && close();
            handleClose();
          }}
          css={css`
            background: gray;
            border: none;

            &:hover,
            &:active {
              background: gray !important;
            }
          `}
        >
          닫기
        </Button>
        {moreBtn && (
          <Button
            className="btn_close"
            variant="secondary"
            onClick={() => {
              submit();
              handleClose();
            }}
            css={css`
              background: var(--main-color);
              border: none;

              &:hover,
              &:active {
                background: var(--main-color) !important;
              }
            `}
          >
            {info.buttonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
export default ModalWindow;
