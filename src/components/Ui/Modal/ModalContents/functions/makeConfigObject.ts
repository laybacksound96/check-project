import { IConfigObject, IContentName } from "../../../../../atoms";
import CountGates from "./CountGates";

const makeConfigObject = (
  level: number,
  content: string,
  type: string
): IContentName => {
  const result: IContentName = {};
  const gateCount = CountGates(content);
  return result;
};

export default makeConfigObject;
