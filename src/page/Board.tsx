import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";
import {
  ICommanderData,
  IFetchedData,
  getCommander,
  loadUserData,
} from "../util/fetch";
import { Suspense } from "react";
import Dashboard from "./Dashboard";

export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;
  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  return defer({ data: Promise.all([loadUserData(id), getCommander()]) });
};

interface IData {
  data: Promise<[IFetchedData, ICommanderData]>;
}
const Board = () => {
  const { data } = useLoaderData() as IData;

  return (
    <>
      <Suspense fallback={<p>유저정보를 기다리는 중이에요...</p>}>
        <Await resolve={data}>
          {(data: [IFetchedData, ICommanderData]) => {
            return <Dashboard data={data} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};
export default Board;
