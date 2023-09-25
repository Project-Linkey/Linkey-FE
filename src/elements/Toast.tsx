import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  text: string;
  type: string;
}

const autoClose = 1000;

export const notify = ({ type, text }: Props) => {
  switch (type) {
    case "default":
      toast(text, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    case "success":
      toast.success(text, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    case "warning":
      toast.warning(text, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    case "error":
      toast.error(text, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default Toast;
