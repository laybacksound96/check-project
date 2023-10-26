import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ContentCardGate from "./ContentCardGate";
import { faCoins, faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import getLowerLightnessColor from "../../../../Functions/getLowerLightnessColor";
import { Accounts, Contents, IContent } from "../../../../../atoms/data";
import getRandomPastelColor from "../../../../Functions/getRandomPastelColor";
import CountGold from "../../../../CountGold";
import { CommanderData } from "../../../../../atoms/commander";
import calculateIncome from "../../../../Functions/calculateIncome";
import { useParams } from "react-router-dom";
import { patchContent } from "../../../../../fetch/contents";
import { patchOrder } from "../../../../../fetch/account";
import { changeOrder } from "../../../../Functions/changeFunctions";
interface IStyle {
  isVisibled: boolean;
  Color: string | undefined;
}

const ContentList = styled.div<IStyle>`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ isVisibled }) => (isVisibled ? "0px 5px 10px 0px rgba(0, 0, 0, 0.35)" : "none")};
  background-color: ${({ Color, theme: { Color_4 }, isVisibled }) =>
    Color === undefined || isVisibled === false ? Color_4 : getLowerLightnessColor(Color, 15)};

  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  h1 {
    font-size: 30px;
  }
  opacity: ${(props) => (props.isVisibled ? "100%" : "30%")};
  transition: opacity 0.3s ease-in-out;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 10px;
  svg {
    font-size: 30px;
    color: ${(props) => props.theme.TextColor_A};
    &:hover {
      transition: 0.1s ease-in-out;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const GateContainer = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    li {
      font-size: 25px;
    }
  }
`;

const GoldCheck = styled.div`
  cursor: pointer;
  display: flex;
  opacity: 40%;
  transition: opacity 0.1s ease-in-out;
  align-items: center;
  span {
    font-size: 1rem;
  }
  svg {
    margin-left: 5px;
  }
  &:hover {
    opacity: 80%;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
`;

interface GoldIconStyle {
  isGoldContents: boolean;
}

const GoldIcon = styled.div<GoldIconStyle>`
  display: flex;
  align-items: center;
  transition: opacity 0.1s ease-in-out;
  span {
    transition: opacity 0.1s ease-in-out;
    margin-left: 5px;
    opacity: ${(props) => (props.isGoldContents ? "100%" : "60%")};
    font-size: 1.4rem;
  }
  svg {
    color: ${(props) => props.theme.TextColor_A};
    margin: 0px;
    padding: 0px;
    font-size: 20px;
  }
`;
const GoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
`;
interface IProps {
  contents: IContent;
  isGoldContents: boolean;
  level: number;
  characterName: string;
  accountIndex: number;
}
const ContentCard = ({ contents, isGoldContents, level, accountIndex, characterName }: IProps) => {
  const { isVisble, contentName, gateSetting } = contents;
  const [contentsData, setContents] = useRecoilState(Contents);
  const commanderData = useRecoilValue(CommanderData);
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const commander = commanderData.find(({ name }) => name === contentName);
  const { userId } = useParams();
  if (!commander) return null;
  const income = calculateIncome([contents], commanderData);
  const isActived = () => {
    if (commander.data[0].gates[0].level <= level) {
      return true;
    }
    return false;
  };
  const goldContentsHandler = async () => {
    if (!isActived() || !contents.isVisble || !userId) return;
    const newContents = await patchContent(userId, contents._id, "isGoldContents", !contents.isGoldContents);
    if (!newContents) return;
    const index = contentsData.findIndex(({ _id }) => newContents._id === _id);
    setContents((prev) => {
      const copiedPrev = [...prev];
      copiedPrev[index] = newContents;
      return copiedPrev;
    });
  };
  const visibleHandler = async () => {
    if (!isActived() || !userId) return;
    const newContents = await patchContent(userId, contents._id, "isVisble", !contents.isVisble);
    if (!newContents) return;
    const index = contentsData.findIndex(({ _id }) => newContents._id === _id);
    const remainGoldContents = newContents.contents.filter(({ isVisble, contentName }) => isVisble && contentName === contents.contentName);
    const account = accounts[accountIndex];
    const contentsOrder = [...account.contentsOrder];
    if (remainGoldContents.length === 0) {
      const targetIndex = contentsOrder.findIndex((name) => name === contents.contentName);
      if (targetIndex !== -1) {
        contentsOrder.splice(targetIndex, 1);
      }
    } else {
      if (!contentsOrder.includes(contents.contentName)) {
        contentsOrder.push(contents.contentName);
      }
    }
    const newAccount = await patchOrder(userId, account._id, {
      name: "contentsOrder",
      order: contentsOrder,
    });
    if (!newAccount) return;
    setAccounts((prev) => {
      const copiedAccounts = [...prev];
      copiedAccounts[accountIndex] = newAccount;
      return copiedAccounts;
    });
    setContents((prev) => {
      const copiedPrev = [...prev];
      copiedPrev[index] = newContents;
      return copiedPrev;
    });
  };
  const handleGateVisible = async (gateIndex: number) => {
    if (!userId || gateIndex === 0) return;
    const copiedGateSetting = [...gateSetting];
    const copiedGate = {
      ...copiedGateSetting[gateIndex],
      isVisible: !copiedGateSetting[gateIndex].isVisible,
    };
    copiedGateSetting[gateIndex] = copiedGate;
    const newContent = await patchContent(userId, contents._id, "gateSetting", copiedGateSetting);
    if (!newContent) return;
    const index = contentsData.findIndex(({ _id }) => newContent._id === _id);
    if (index === -1) return;
    setContents((prev) => {
      const copiedPrev = [...prev];
      copiedPrev[index] = newContent;
      return copiedPrev;
    });
  };
  const handleGateDifficulty = async (gateIndex: number, Difficulty: string) => {
    if (!userId) return;
    const newDifficulty = Difficulty === "hard" ? "normal" : "hard";
    const copiedGateSetting = [...gateSetting];
    const copiedGate = {
      ...copiedGateSetting[gateIndex],
      difficulty: newDifficulty,
    };
    copiedGateSetting[gateIndex] = copiedGate;
    const newContent = await patchContent(userId, contents._id, "gateSetting", copiedGateSetting);
    if (!newContent) return;
    const index = contentsData.findIndex(({ _id }) => newContent._id === _id);
    if (index === -1) return;
    setContents((prev) => {
      const copiedPrev = [...prev];
      copiedPrev[index] = newContent;
      return copiedPrev;
    });
  };
  return (
    <ContentList isVisibled={isVisble} Color={getRandomPastelColor(contentName, gateSetting)}>
      <CardHeader>
        <header>
          <div>
            <h1>{contentName}</h1>
          </div>
          <IconContainer onClick={() => visibleHandler()}>
            <FontAwesomeIcon icon={isVisble ? faEye : faEyeSlash} />
          </IconContainer>
        </header>
        <GoldContainer>
          <GoldIcon isGoldContents={isGoldContents}>
            <FontAwesomeIcon icon={faCoins} style={{ color: isGoldContents ? "yellow" : "gray" }} />
            <CountGold income={income} />
          </GoldIcon>
          <GoldCheck onClick={() => goldContentsHandler()}>
            <span>골드획득 컨텐츠</span>
            <FontAwesomeIcon icon={isGoldContents ? faSquareCheck : faSquare} />
          </GoldCheck>
        </GoldContainer>
      </CardHeader>
      <GateContainer>
        {gateSetting.map((gate, index) => {
          const { difficulty, isVisible: isGateVisible } = gate;
          const checkConvertable = () => {
            // 현재 레벨이 하드레벨보다 높은지
            if (commander.data.length === 1) {
              const { gates } = commander.data[0];
              return gates[index].level <= level;
            } else {
              const { gates } = commander.data[1];
              return gates[index].level <= level;
            }
          };
          const checkGateActivate = () => {
            // 현재 레벨이 노말보다 높은지
            const { gates } = commander.data[0];
            return gates[index].level <= level;
          };

          return (
            <ContentCardGate
              key={index}
              Difficulty={difficulty}
              GateIndex={index}
              isVisible={isVisble}
              isGateVisible={isGateVisible}
              isConvertable={checkConvertable()}
              isGateActivate={checkGateActivate()}
              Color={getRandomPastelColor(contentName, gateSetting)}
              handleGateVisible={handleGateVisible}
              handleGateDifficulty={handleGateDifficulty}
            />
          );
        })}
      </GateContainer>
    </ContentList>
  );
};
export default ContentCard;
