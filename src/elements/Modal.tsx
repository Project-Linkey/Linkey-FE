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
    body: string;
    buttonText?: string;
  };
}

function ModalWindow({ showYN, setShowYN, info }: Props) {
  useEffect(() => {
    setShowYN(showYN);
  }, [showYN]);

  const handleClose = () => setShowYN(false);

  return (
    <Modal size="sm" show={showYN} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{info.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{info.body}</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn_close"
          variant="secondary"
          onClick={handleClose}
          css={css`
            background: var(--main-color);
            border: none;

            &:hover {
              background: var(--main-color);
            }
          `}
        >
          {info.buttonText || "닫기"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalWindow;
