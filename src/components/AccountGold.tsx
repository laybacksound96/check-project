import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { AccountOrder } from "../atoms/data";
import { CommanderData } from "../atoms/commander";
import CountGold from "./CountGold";

const Container = styled.div`
  svg {
    margin-right: 5px;
    path {
      color: yellow;
    }
  }
  span {
    font-size: 1.9rem;
    &.total-gold {
      font-size: 1.7rem;
      opacity: 70%;
    }
  }
`;
const AccountGold = () => {
  const accountOrder = useRecoilValue(AccountOrder);
  const commanderData = useRecoilValue(CommanderData);
  const calculateTotalIncome = () => {
    let totalGold = 0;
    for (let i in accountOrder) {
      const { contents, characterOrder } = accountOrder[i];
      const goldContents = contents.filter(
        ({ isVisble, isGoldContents, owner }) =>
          isVisble === true &&
          isGoldContents === true &&
          characterOrder.includes(owner)
      );
      for (let j in goldContents) {
        const name = goldContents[j].contentName;
        const gate = goldContents[j].gateSetting;
        for (let k in gate) {
          const commander = commanderData.find(
            ({ name: commanderName }) => name === commanderName
          );
          if (gate[k].isVisible === false || !commander) continue;
          const diff = gate[k].difficulty;
          const data = commander.data.find(
            ({ difficulty }) => difficulty === diff
          );
          if (!data) continue;
          totalGold += data.gates[k].gold;
        }
      }
    }
    return totalGold;
  };
  const calculateCheckedIncome = () => {
    let checkedGold = 0;
    for (let i in accountOrder) {
      const { checks, contents } = accountOrder[i];
      const goldContents = contents.filter(
        ({ isVisble, isGoldContents, contentName, owner }) =>
          isVisble === true &&
          isGoldContents === true &&
          checks.find(
            ({ characterName, contentName: cont }) =>
              cont === contentName && characterName === owner
          )
      );
      for (let j in goldContents) {
        const name = goldContents[j].contentName;
        const gate = goldContents[j].gateSetting;
        for (let k in gate) {
          const commander = commanderData.find(
            ({ name: commanderName }) => name === commanderName
          );
          if (gate[k].isVisible === false || !commander) continue;
          const diff = gate[k].difficulty;
          const data = commander.data.find(
            ({ difficulty }) => difficulty === diff
          );
          if (!data) continue;
          checkedGold += data.gates[k].gold;
        }
      }
    }
    return checkedGold;
  };
  return (
    <Container>
      <FontAwesomeIcon icon={faCoins} />
      <CountGold income={calculateCheckedIncome()} />
      <span className="total-gold">/</span>
      <CountGold income={calculateTotalIncome()} />
    </Container>
  );
};

export default AccountGold;
