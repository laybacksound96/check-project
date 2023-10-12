import React from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import AddAccountButton from "./ButtonAddAccount";
import { AxisLocker } from "./Functions/AxisLocker";
import DragCharacters from "./DragCharacters";
import UncheckAllButton from "./UncheckAllContents";
import ModalAddAccount from "./ModalAddAccount";
import ModalConfigAccount from "./ModalConfigAccount";
import { ModalAddAcountAtom, ModalConfigAccountAtom, ModalConfigContentsAtom } from "../atoms/modal";
import ModalConfigContent from "./ModalConfigContent";
import { changeAccountOrder } from "./Functions/changeFunctions";
import { Accounts, IAccount } from "../atoms/data";
import { LoginState } from "../atoms/login";
import { patchAccountOrder, uncheckAll } from "../fetch/user";
import { useParams } from "react-router-dom";
const DragBoxStyle = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.Color_1};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: ${(props) => props.theme.Color_4};
  border-width: 3px;
  padding: 30px 40px;
  border-radius: 15px;
  margin-bottom: 150px;
`;
const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const DragAccounts = () => {
  const loggined = useRecoilValue(LoginState);
  const modalConfigContent = useRecoilValue(ModalConfigContentsAtom);
  const modalAddacount = useRecoilValue(ModalAddAcountAtom);
  const modalConfigAccount = useRecoilValue(ModalConfigAccountAtom);
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const { userId } = useParams();
  const dragAccountHandler = async (dragInfo: DropResult) => {
    if (!userId) return;
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;

    const prevOrder = accounts.map(({ _id }) => _id);
    const newAccountOrder = changeAccountOrder(dragInfo, prevOrder);
    const result = await patchAccountOrder(userId, newAccountOrder);
    const newAccounts = result.map((name) => {
      return accounts.find(({ _id }) => name === _id);
    }) as IAccount[];
    setAccounts(newAccounts);
  };

  const uncheckHandler = () => {
    if (!userId) return;
    uncheckAll(userId).then(() => {
      setAccounts((prev) => {
        const copiedPrev = [...prev];
        copiedPrev.forEach((account, index) => {
          const copiedAccount = { ...account, checks: [] };
          copiedPrev[index] = copiedAccount;
        });
        return copiedPrev;
      });
    });
  };

  return (
    <DragBoxStyle>
      {modalConfigContent && <ModalConfigContent />}
      {modalConfigAccount.status && <ModalConfigAccount />}
      {modalAddacount && <ModalAddAccount />}
      <DragDropContext onDragEnd={dragAccountHandler}>
        <Droppable droppableId="accounts" direction="vertical">
          {(provided) => (
            <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
              {loggined && <UncheckAllButton handleUncheck={uncheckHandler} />}
              {accounts.map((account, index) => {
                return (
                  <Draggable draggableId={account._id} key={account._id} index={index} isDragDisabled={!loggined}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} style={AxisLocker(provided.draggableProps.style!, false)}>
                        <DragCharacters DragHandleProps={provided.dragHandleProps} account={account} accountIndex={index} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </AccountStyle>
          )}
        </Droppable>
      </DragDropContext>
      {loggined && <AddAccountButton />}
    </DragBoxStyle>
  );
};
export default React.memo(DragAccounts);
