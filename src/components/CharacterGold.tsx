import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { ICheck, IContent } from "../atoms/data";
import { useRecoilValue } from "recoil";
import { CommanderData, ICommander } from "../atoms/commander";
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
const calculateIncome = (
  goldContents: IContent[],
  commanderData: ICommander[],
  checks: ICheck[],
  CharacterName: string
) => {
  let gold = 0;
  goldContents.forEach(({ contentName, gateSetting }) => {
    const isChecked = checks.find(
      ({ characterName: char, contentName: cont }) =>
        CharacterName === char && contentName === cont
    );
    const name = contentName;
    const difficulty = gateSetting
      .filter(({ isVisible }) => isVisible === true)
      .map(({ difficulty }) => difficulty);

    const commander = commanderData.find(
      ({ name: commanderName }) => commanderName === name
    );
    if (!commander) return;
    difficulty.forEach((difficulty, index) => {
      const gate = commander.data.find(
        ({ difficulty: diff }) => difficulty === diff
      );
      if (!gate || !isChecked) return;
      gold += gate.gates[index].gold;
    });
  });
  return gold;
};
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
const CountGold = ({ income }: { income: number }) => {
  const [gold, setGold] = useState(0);
  const [PrevGold, setPrevGold] = useState(gold);
  useEffect(() => {
    setGold((prev) => {
      setPrevGold(prev);
      return income;
    });
  }, [income]);
  return (
    <span>
      <CountUp start={PrevGold} end={gold} />
    </span>
  );
};
export default CharacterGold;
