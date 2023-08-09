import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IContentState } from "../../../atoms/Settings/ContentSetting";
import { IGatesContent } from "../../../atoms/Settings/Gates";
import CalculateCharacterClearGold from "../Functions/CalculateCharacterClearGold";
import CountUp from "react-countup";
const GoldContainer = styled.div`
  svg {
    margin-right: 5px;
  }
  * {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
  }
  padding-left: 10px;
  margin-right: 5px;
  margin-bottom: 8px;
`;
interface IProps {
  contentState: IContentState;
  gatesContent: IGatesContent;
}
const CharacterGold = ({ contentState, gatesContent }: IProps) => {
  const [gold, setGold] = useState(0);
  const [PrevGold, setPrevGold] = useState(gold);
  useEffect(() => {
    // setGold((prev) => {
    //   setPrevGold(prev);
    //   return CalculateCharacterClearGold(contentState, gatesContent);
    // });
  }, [contentState, gatesContent]);
  return (
    <GoldContainer>
      <FontAwesomeIcon icon={faCoins} />
      <span>
        <CountUp start={PrevGold} end={gold} />
      </span>
    </GoldContainer>
  );
};
export default CharacterGold;
