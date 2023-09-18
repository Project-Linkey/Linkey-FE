import { useLocation, Outlet } from "react-router-dom";
import Content from "./components/common/Content";
import "./styles/index.css";

function App() {
  const location = useLocation();

  console.log(location);

  return (
    <Content>
      상단 네브바
      <Outlet />
      하단 네브바
    </Content>
  );
}

export default App;
