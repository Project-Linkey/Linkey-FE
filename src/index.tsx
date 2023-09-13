import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./pages/Join";
import Login from "./pages/Login";
import ClassList from "./pages/class/ClassList";
import ClassDetail from "./pages/class/ClassDetail";
import ReviewList from "./pages/review/ReviewList";
import ReviewDetail from "./pages/review/ReviewDetail";
import CreateClass from "./pages/class/CreateClass";
import MyPage from "./pages/myPage/MyPage";
import EditUserInfo from "./pages/myPage/EditUserInfo";
import RegularPaymentHistory from "./pages/myPage/RegularPaymentHistory";
import MyLinkHistory from "./pages/myPage/MyLinkHistory";
import MyClubHistory from "./pages/myPage/MyClubHistory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      keepPreviousData: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/class/:category",
        element: <ClassList />,
      },
      {
        path: "/class/:category/:id",
        element: <ClassDetail />,
      },
      {
        path: "/review/:category",
        element: <ReviewList />,
      },
      {
        path: "/review/:category/:id",
        element: <ReviewDetail />,
      },
      {
        path: "/createClass/:category",
        element: <CreateClass />,
      },
      {
        path: "/chat/:category",
        element: <ReviewList />,
      },
      {
        path: "/chat/:category/:id",
        element: <ReviewDetail />,
      },
      {
        path: "/myPage",
        element: <MyPage />,
      },
      {
        path: "/myPage/edit/:userId",
        element: <EditUserInfo />,
      },
      {
        path: "/myPage/regularPaymentHistory",
        element: <RegularPaymentHistory />,
      },
      {
        path: "/myPage/myLinkHistory/:type",
        element: <MyLinkHistory />,
      },
      {
        path: "/myPage/myClubHistory:type",
        element: <MyClubHistory />,
      },
    ],
  },
]);

root.render(
  <React.Suspense fallback={<p>loading...</p>}>
    <React.StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  </React.Suspense>
);

reportWebVitals();
