import { useRecoilState } from "recoil";
import { CharacterState } from "../../atoms";
import Horizontal from "./Horizontal/Horizontal";
import styled from "styled-components";
import { InsertAccountHandler } from "./Functions/InsertAccount";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { AxisLocker } from "./Functions/AxisLocker";

const AddAccountBtn = styled.button`
  height: 100px;
  border: none;
  background-color: ${(props) => props.theme.subColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;

const AccountStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
function CheckBox() {
  const [accounts, setAccounts] = useRecoilState(CharacterState);

  const AddAccountHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setAccounts((prev) => {
      return [...prev, InsertAccountHandler()];
    });
  };
  const onDragEnd2 = (dragInfo: DropResult) => {
    return;
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd2}>
        <Droppable droppableId="sssdadw" direction="vertical">
          {(provided) => (
            <AccountStyle ref={provided.innerRef} {...provided.droppableProps}>
              {accounts.map((account, index) => (
                <Draggable
                  draggableId={`account_${index}`}
                  index={index}
                  key={`account_${index}`}
                >
                  {(provided) => (
                    <Horizontal
                      parentProvided={provided}
                      account={account}
                      key={account.Characters[0]}
                      index={index}
                      style={AxisLocker(provided.draggableProps.style!, false)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </AccountStyle>
          )}
        </Droppable>
      </DragDropContext>
      <AddAccountBtn onClick={AddAccountHandler}>
        + add new account?
      </AddAccountBtn>
    </>
  );
}

export default CheckBox;
