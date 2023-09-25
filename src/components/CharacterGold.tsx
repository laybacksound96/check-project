import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { ICheck, IContent } from "../atoms/data";
import { useRecoilValue } from "recoil";
import { CommanderData } from "../atoms/commander";
import CountGold from "./CountGold";
import calculateIncome from "./Functions/calculateCheckedIncome";
const GoldContainer = styled.div`
  svg {
    margin-right: 5px;
  }
  * {
    font-size: 0.9rem;
    opacity: 40%;
  }
  padding-left: 10px;
  margin-right: 5px;
  margin-bottom: 8px;
`;

interface IProps {
  contents: IContent[];
  CharacterName: string;
  checks: ICheck[];
}

const CharacterGold = ({ contents, CharacterName, checks }: IProps) => {
  const commanderData = useRecoilValue(CommanderData);
  const goldContents = contents.filter(
    ({ isVisble, isGoldContents }) =>
      isVisble === true && isGoldContents === true
  );
  return (
    <GoldContainer>
      <FontAwesomeIcon icon={faCoins} />
      <CountGold
        income={calculateIncome(
          goldContents,
          commanderData,
          checks,
          CharacterName
        )}
      />
    </GoldContainer>
  );
};

export default CharacterGold;
