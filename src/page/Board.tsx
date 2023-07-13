import {
  Await,
  LoaderFunction,
  defer,
  useRouteLoaderData,
} from "react-router-dom";
import { IFetchedData, loadUserData } from "../util/fetch";
import { Suspense } from "react";
import Dashboard from "./Dashboard";

export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;
  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  return defer({ userData: await loadUserData(id) });
};
interface IData {
  userData: IFetchedData;
}
const Board = () => {
  const data = useRouteLoaderData("board-userData");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data}>
          {({ userData }: IData) => {
            return <Dashboard userData={userData} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
