import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountState } from "../../../atoms/atoms";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AxisLocker } from "../Functions/AxisLocker";
import { dragIcon } from "../../../Settings";
import { useRecoilState } from "recoil";
import useModal from "../../../CustomHooks/Modal/useModal";

export const Character = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  font-size: ${dragIcon.row.fontSize}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 50%;
    }
  }
  button {
    margin-top: 0px;
  }
  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const CharactersContainer = styled.div`
  display: flex;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  padding-right: 5px;
  padding-top: 5px;
`;
export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
    &:nth-child(2) {
      font-size: 0.85rem;
    }
  }
`;
interface IProps {
  boardId: string;
  CharacterName: string;
  AccountName: string;
  index: number;
}
function DragCharactersDraggable({
  boardId,
  CharacterName,
  index,
  AccountName,
}: IProps) {
  const [openModal] = useModal("CONFIG_ACCOUNT");
  const [
    {
      [`${AccountName}`]: {
        [`${CharacterName}`]: { ItemMaxLevel, CharacterClassName },
      },
    },
    setAccountState,
  ] = useRecoilState(AccountState);

  const handleVisible = () => {
    setAccountState((prev) => {
      const currentVisible = prev[AccountName][CharacterName].isVisible;
      const copiedPrev = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            isVisible: !currentVisible,
          },
        },
      };

      return copiedPrev;
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <CharactersContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
        >
          <Character {...provided.dragHandleProps}>
            <NameContainer>
              {CharacterName}
              <span>{CharacterClassName}</span>
              <span>Lv {ItemMaxLevel}</span>
            </NameContainer>
            <ButtonContainer>
              <FontAwesomeIcon onClick={handleVisible} icon={faEye} />
              <FontAwesomeIcon
                onClick={() => openModal({ AccountName, CharacterName })}
                icon={faGear}
                size="lg"
              />
            </ButtonContainer>
          </Character>
        </CharactersContainer>
      )}
    </Draggable>
  );
}

export default React.memo(DragCharactersDraggable);
