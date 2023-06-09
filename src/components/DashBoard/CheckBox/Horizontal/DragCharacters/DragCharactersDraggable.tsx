import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../../../Functions/AxisLocker";
import { dragIcon } from "../../../../../Settings";
import Checkbox from "../CheckBoxButton/CheckBoxButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
  VisibledColumns,
} from "../../../../../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import getColorInFrequencyCounter from "../../../Functions/getColorFrequencyCounter";
import {
  ModalState,
  IModalObject,
  ModalEnum,
} from "../../../../../atoms/modal";

const Character = styled.div`
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
  flex-direction: column;
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
            {CharacterName}
            <ButtonContainer>
              {isHovered && (
                <FontAwesomeIcon onClick={openModal} icon={faGear} size="lg" />
              )}
            </ButtonContainer>
          </Character>

          {visibledColumns.map(({ name: ContentName, width }, ColumnIndex) => {
            const color = getColorInFrequencyCounter(
              contentsFrequency,
              ContentName,
              CharacterName
            );
            return (
              Contents[ContentName].isVisible && (
                <Checkbox
                  key={index + ColumnIndex + ContentName}
                  isChecked={checkBoxConfig[ContentName].isCleared}
                  isVisible={checkBoxConfig[ContentName].isVisible}
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
