import {
  Await,
  LoaderFunction,
  defer,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { IFetchedData, loadUserData } from "../util/fetch";
import React, { Suspense } from "react";
import Dashboard from "./Dashboard";
import { loadToken } from "../util/auth";

export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;
  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  const userData = await loadUserData(id);
  return defer({ userData });
};
interface IData {
  userData: IFetchedData;
}
const Board = () => {
  const data = useRouteLoaderData("board-userData");
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  const { userId } = useParams();
  const isEditable = token?.user_id === userId;

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data}>
          {({ userData }: IData) => {
            return <Dashboard userData={userData} isEditable={isEditable} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
