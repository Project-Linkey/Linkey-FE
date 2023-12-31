import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Main from "./pages/Main";
import Join from "./pages/Join";
import Login from "./pages/Login";
import ClassList from "./pages/class/ClassList";
import ClassDetail from "./pages/class/ClassDetail";
import ReviewList from "./pages/review/ReviewList";
import ReviewDetail from "./pages/review/ReviewDetail";
import ReviewWriteableList from "./pages/review/ReviewWriteableList";
import ReviewForm from "./pages/review/ReviewForm";
import CreateClass from "./pages/class/CreateClass";
import MyPage from "./pages/myPage/MyPage";
import EditUserInfo from "./pages/myPage/EditUserInfo";
import RegularPaymentHistory from "./pages/myPage/RegularPaymentHistory";
import MyLinkHistory from "./pages/myPage/MyLinkHistory";
import MyClubHistory from "./pages/myPage/MyClubHistory";
import Error from "./pages/404";

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
      { path: "/", element: <Main /> },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/class/:type",
        element: <ClassList />,
      },
      {
        path: "/class/:type/:id",
        element: <ClassDetail />,
      },
      {
        path: "/review/:type",
        element: <ReviewList />,
      },
      {
        path: "/review/:type/:id",
        element: <ReviewDetail />,
      },
      {
        path: "/review/writeableList",
        element: <ReviewWriteableList />,
      },
      {
        path: "/review/form",
        element: <ReviewForm />,
      },
      {
        path: "/createClass/:type",
        element: <CreateClass />,
      },
      {
        path: "/chat/:type",
        element: <ReviewList />,
      },
      {
        path: "/chat/:type/:id",
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
  { path: "/*", element: <Error /> },
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
