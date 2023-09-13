import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      Header 들어갈 부분
      <Outlet />
    </div>
  );
}

export default App;
