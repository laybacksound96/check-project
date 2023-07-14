import {
  Await,
  LoaderFunction,
  defer,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { IFetchedData, loadUserData } from "../util/fetch";
import { Suspense } from "react";
import Dashboard from "./Dashboard";
import { loadToken } from "../util/auth";

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
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  const { userId } = useParams();
  const isEditable = token?.user_id === userId;

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data}>
          {({ userData }: IData) => {
            return <Dashboard userData={userData} login={isEditable} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
