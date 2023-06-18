import { atom } from "recoil";
import makeDefaultCommander from "../components/Ui/Modal/ModalContents/functions/makeDefaultCommander";

export interface IAccountOrder {
  AccountName: string;
  CharacterOrder: string[];
}

export const AccountOrder = atom<IAccountOrder[]>({
  key: "AccountOrder",
  default: [],
});

export const VisibledColumns = atom<string[]>({
  key: "visibledColumns",
  default: initializerColumnOrder(),
});

function initializerColumnOrder(): string[] {
  const contents = makeDefaultCommander();
  return Object.keys(contents);
}
