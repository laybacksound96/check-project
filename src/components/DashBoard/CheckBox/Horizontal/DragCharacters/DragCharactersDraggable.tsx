import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { AxisLocker } from "../../../Functions/AxisLocker";
import { dragIcon } from "../../../../../Settings";
import Checkbox from "../CheckBoxButton/CheckBoxButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckBoxConfig,
  ContentsFrequency,
  ContentsState,
  ModalEnum,
  ModalState,
  VisibledColumns,
} from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import getColorInFrequencyCounter from "../../../Functions/getColorFrequencyCounter";

const Name = styled.div`
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
const NameBox = styled.div`
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
  index: number;
}
function DragCharactersDraggable({ boardId, CharacterName, index }: IProps) {
  const Contents = useRecoilValue(ContentsState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const visibledColumns = useRecoilValue(VisibledColumns);
  const setIsModalOpen = useSetRecoilState(ModalState);
  const setCheckboxState = useSetRecoilState(CheckBoxConfig);
  const { [`${CharacterName}`]: ContentState } = useRecoilValue(CheckBoxConfig);

  const [isHovered, setIsHovered] = useState(false);

  const CheckBoxOnclick = (char: string, cont: string) => {
    setCheckboxState((Characters) => {
      const copiedCharacters = { ...Characters };
      const ContentName = { ...copiedCharacters[char] };
      const ConfigObject = { ...ContentName[cont] };
      const state = copiedCharacters[char][cont].isCleared;

      ConfigObject.isCleared = !state;
      ContentName[cont] = ConfigObject;
      copiedCharacters[char] = ContentName;
      return copiedCharacters;
    });
  };

  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.CONFIG_ACCOUNT;
      copiedPrev.modalProp = CharacterName;
      return { ...copiedPrev };
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <NameBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={AxisLocker(provided.draggableProps.style!, false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Name {...provided.dragHandleProps}>
            {CharacterName}
            <ButtonContainer>
              {isHovered && (
                <FontAwesomeIcon onClick={openModal} icon={faGear} size="lg" />
              )}
            </ButtonContainer>
          </Name>

          {visibledColumns.map((Content, ColumnIndex) => {
            const color = getColorInFrequencyCounter(
              contentsFrequency,
              Content.name,
              CharacterName
            );
            return (
              Contents[Content.name].isVisible && (
                <Checkbox
                  key={index + ColumnIndex + Content.name}
                  isChecked={ContentState[Content.name].isCleared}
                  isVisible={ContentState[Content.name].isVisible}
                  CheckBoxOnclick={CheckBoxOnclick}
                  ContentName={Content.name}
                  CharacterName={CharacterName}
                  Width={Content.width}
                  Color={color}
                />
              )
            );
          })}
        </NameBox>
      )}
    </Draggable>
  );
}

export default React.memo(DragCharactersDraggable);
