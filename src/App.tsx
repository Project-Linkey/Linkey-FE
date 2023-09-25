import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Content from "./components/common/Content";
import "./styles/index.css";
import { css } from "@emotion/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const [navDisplayYN, setNavDisplayYN] = useState<boolean>(false);

  useEffect(() => {
    const notDisplayList: string[] = ["/", "/login", "/join"];

    setNavDisplayYN(notDisplayList.includes(location.pathname) ? false : true);
  }, [location]);

  useEffect(() => {
    // axios에 headers 커스텀 설정
    const headers = () => {
      if (typeof window !== "undefined") {
        let userInfo = JSON.parse(sessionStorage.getItem("linkeyUserInfo"));

        return userInfo;
      }
    };

    // api 요청 시 회원 식별 값을 headers에 담아 전달하기 위한 설정
    axios.defaults.headers.manager = headers();
  }, []);

  return (
    <Content>
      {navDisplayYN && (
        <div
          css={css`
            width: 100%;
            height: 60px;
            background: #dadada;
            border-radius: 38px 38px 0 0;
            margin-top: -1px;

            @media screen and (max-width: 414px) {
              border-radius: 0;
            }
          `}
        >
          상단 네브바
        </div>
      )}
      <Outlet />
      {navDisplayYN && (
        <div
          css={css`
            width: 100%;
            height: 60px;
            background: #dadada;
            border-radius: 0 0 38px 38px;
            position: absolute;
            bottom: 0;

            @media screen and (max-width: 414px) {
              border-radius: 0;
            }
          `}
        >
          하단 네브바
        </div>
      )}
    </Content>
  );
}

export default App;
