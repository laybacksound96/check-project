import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { AxisLocker } from "../../../Functions/AxisLocker";
import { dragIcon } from "../../../../../Settings";
import Checkbox from "../CheckBoxButton/CheckBoxButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccountState,
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
} from "../../../../../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import getColorInFrequencyCounter from "../../../Functions/getColorFrequencyCounter";
import {
  ModalState,
  IModalObject,
  ModalEnum,
} from "../../../../../atoms/modal";
import { VisibledColumns } from "../../../../../atoms/order";

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
  }
  button {
    margin-top: 0px;
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
  svg {
    opacity: 60%;
    border-radius: 10px;
    padding: 10px 10px;
    &:hover {
      opacity: 100%;
      background-color: rgba(100, 100, 100, 0.7);
    }
  }
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
  const setIsModalOpen = useSetRecoilState(ModalState);
  const Contents = useRecoilValue(ContentsState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const [
    {
      [`${CharacterName}`]: { ItemMaxLevel, CharacterClassName },
    },
    setAccountState,
  ] = useRecoilState(AccountState);
  const [{ [`${CharacterName}`]: checkBoxConfig }, setCheckboxState] =
    useRecoilState(CheckBoxConfig);

  const [isHovered, setIsHovered] = useState(false);

  const CheckBoxOnclick = (character: string, content: string) => {
    setCheckboxState((Characters) => {
      const copiedCharacters = { ...Characters };
      const ContentName = { ...copiedCharacters[character] };
      const ConfigObject = { ...ContentName[content] };
      const state = copiedCharacters[character][content].isCleared;

      ConfigObject.isCleared = !state;
      ContentName[content] = ConfigObject;
      copiedCharacters[character] = ContentName;
      return copiedCharacters;
    });
  };
  const handleVisible = () => {
    setAccountState((prev) => {
      const currentVisible = prev[CharacterName].isVisible;
      const copiedPrev = {
        ...prev,
        [CharacterName]: { ...prev[CharacterName], isVisible: !currentVisible },
      };

      return copiedPrev;
    });
  };
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev: IModalObject = {
        ...prev,
        modalType: ModalEnum.CONFIG_ACCOUNT,
        isModalOpen: true,
        modalProp: {
          ...prev.modalProp,
          AccountName: AccountName,
          CharacterName: CharacterName,
        },
      };

      return { ...copiedPrev };
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <CharactersContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Character {...provided.dragHandleProps}>
            <NameContainer>
              {CharacterName}
              <span>{CharacterClassName}</span>
              <span>Lv {ItemMaxLevel}</span>
            </NameContainer>
            {isHovered && (
              <ButtonContainer>
                <FontAwesomeIcon onClick={handleVisible} icon={faEye} />
                <FontAwesomeIcon onClick={openModal} icon={faGear} size="lg" />
              </ButtonContainer>
            )}
          </Character>

          {visibledColumns.map((ContentName, ColumnIndex) => {
            const width = Contents[ContentName].width;
            const color = getColorInFrequencyCounter(
              contentsFrequency,
              ContentName,
              CharacterName
            );
            const { isCleared, isVisible, isActivated } =
              checkBoxConfig[ContentName];
            return (
              Contents[ContentName].isVisible && (
                <Checkbox
                  key={index + ColumnIndex + ContentName}
                  isChecked={isCleared}
                  isVisible={isVisible}
                  isActivated={isActivated}
                  CheckBoxOnclick={CheckBoxOnclick}
                  ContentName={ContentName}
                  CharacterName={CharacterName}
                  Width={width}
                  Color={color}
                />
              )
            );
          })}
        </CharactersContainer>
      )}
    </Draggable>
  );
}

export default React.memo(DragCharactersDraggable);
