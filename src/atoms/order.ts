import { atom } from "recoil";
import makeDefaultCommander from "../components/Ui/Modal/ModalContents/functions/makeDefaultCommander";
import { dragIcon } from "../Settings";

export interface IAccountOrder {
  AccountName: string;
  CharacterOrder: string[];
}
export interface Contents {
  ["name"]: string;
  ["width"]: number;
}

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});

export const VisibledColumns = atom<Contents[]>({
  key: "visibledColumns",
  default: initializerColumnOrder(),
});

function initializerColumnOrder(): Contents[] {
  const contents = makeDefaultCommander();
  return Object.keys(contents).map((contentName) => {
    return { name: contentName, width: dragIcon.icon.edgeLength };
  });
}
