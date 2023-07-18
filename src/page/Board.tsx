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
  try {
    const userData = await loadUserData(id);
    return defer({ userData });
  } catch (error) {
    console.error("Error while loading user data:", error);
    throw new Error("Failed to load user data");
  }
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
        <Await resolve={data} errorElement={<div>error</div>}>
          {({ userData }: IData) => {
            return <Dashboard userData={userData} login={isEditable} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
