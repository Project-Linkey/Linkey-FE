import { useLocation, Outlet } from "react-router-dom";

function App() {
  const location = useLocation();

  console.log(location);

  return (
    <div>
      상단 네브바
      <Outlet />
      하단 네브바
    </div>
  );
}

export default App;
