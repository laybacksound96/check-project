import {
  Await,
  LoaderFunction,
  defer,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { loadUserData } from "../util/fetch";
import { Suspense } from "react";
export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;
  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  return defer({ userData: await loadUserData(id) });
};

const Board = () => {
  const { userId } = useParams();
  const data = useRouteLoaderData("board-userData");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data}>
          {(loadedEvent) => (
            <>
              <div>asdasd</div>
              <div>{userId}</div>
              <div>{loadedEvent.userData.global_name}</div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
