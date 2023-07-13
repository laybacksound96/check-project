import {
  Await,
  LoaderFunction,
  defer,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { loadUserData } from "../util/fetch";
import { Suspense } from "react";
import styled from "styled-components";
import DragAccounts from "../components/DashBoard/DragAccounts/DragAccounts";
import HeaderBox from "../components/DashBoard/HeaderBox/HeaderBox";
import Modal from "../components/Ui/Modal/Modal";
import Dashboard from "./Dashboard";
const DashboardStyle = styled.div`
  margin-top: 5px;
  min-width: 800px;
`;
export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;
  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  return defer({ userData: await loadUserData(id) });
};

const Board = () => {
  const { paramId } = useParams();
  const data = useRouteLoaderData("board-userData");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data}>{(loadedEvent) => <Dashboard />}</Await>
      </Suspense>
    </>
  );
};
export default Board;
