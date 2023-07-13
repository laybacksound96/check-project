import { createBrowserRouter, useParams } from "react-router-dom";
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
            children: [
              {
                index: true,
                element: <Board />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// function Router() {
//   useEffect(() => {
//     if (!document.cookie) return;
//     const tokenParts = document.cookie.split("=");
//     localStorage.setItem(tokenParts[0], tokenParts[1]);
//   }, []);
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/dashboard/:userId">
//           <Dashboard />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
// }
