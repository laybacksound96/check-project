import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Dashboard from "./Dashboard";
import { IUser } from "../atoms/data";
import { ICommander } from "../atoms/commander";
import { getCommander } from "../fetch/api";
import { loadUserData } from "../fetch/user";

export const loadBoardData: LoaderFunction = async ({ request, params }) => {
  const id = params.userId;

  if (typeof id === "undefined") {
    throw new Error("Invalid id");
  }
  return defer({ data: Promise.all([loadUserData(id), getCommander()]) });
};

interface IData {
  data: Promise<[IUser, ICommander[]]>;
}
const Board = () => {
  const { data } = useLoaderData() as IData;

  return (
    <>
      <Suspense fallback={<p>유저정보를 기다리는 중이에요...</p>}>
        <Await resolve={data}>
          {(data: [IUser, ICommander[]]) => {
            return <Dashboard data={data} />;
        </Await>
      </Suspense>
