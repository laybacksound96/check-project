import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import ErrorPage from "./page/ErrorPage";
import RootLayout from "./page/Layout";
import { loadToken } from "./util/auth";
import LayoutBoard from "./page/LayoutBoard";
import Board, { loadBoardData } from "./page/Board";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: loadToken,
    children: [
      { index: true, element: <Home /> },
      {
        path: "board",
        element: <LayoutBoard />,
        children: [
          {
            index: true,
            element: <div>main</div>,
          },
          {
            path: ":userId",
            id: "board-userData",
            loader: loadBoardData,
            element: <Board />,
          },
        ],
      },
    ],
  },
]);
