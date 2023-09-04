import { useEffect } from "react";
import makeDataResult from "../components/Ui/Modal/ModalContents/functions/AddAccount/makes";
const data = [
  {
    ServerName: "아만",
    CharacterName: "숨앤",
    CharacterLevel: 51,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,415.00",
    ItemMaxLevel: "1,415.00",
  },
  {
    ServerName: "아만",
    CharacterName: "냥후잉",
    CharacterLevel: 60,
    CharacterClassName: "소울이터",
    ItemAvgLevel: "1,582.50",
    ItemMaxLevel: "1,582.50",
  },
  {
    ServerName: "아만",
    CharacterName: "숨엔",
    CharacterLevel: 60,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,587.50",
    ItemMaxLevel: "1,587.50",
  },
  {
    ServerName: "아만",
    CharacterName: "꿈엔",
    CharacterLevel: 60,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,601.67",
    ItemMaxLevel: "1,601.67",
  },
  {
    ServerName: "아만",
    CharacterName: "봄엔",
    CharacterLevel: 60,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,607.50",
    ItemMaxLevel: "1,607.50",
  },
  {
    ServerName: "아만",
    CharacterName: "듦앤",
    CharacterLevel: 60,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,610.83",
    ItemMaxLevel: "1,610.83",
  },
  {
    ServerName: "아만",
    CharacterName: "해듦",
    CharacterLevel: 60,
    CharacterClassName: "기상술사",
    ItemAvgLevel: "1,560.00",
    ItemMaxLevel: "1,560.00",
  },
  {
    ServerName: "아만",
    CharacterName: "듦엔",
    CharacterLevel: 60,
    CharacterClassName: "도화가",
    ItemAvgLevel: "1,620.00",
    ItemMaxLevel: "1,620.00",
  },
  {
    ServerName: "아만",
    CharacterName: "소후잉",
    CharacterLevel: 60,
    CharacterClassName: "소서리스",
    ItemAvgLevel: "1,525.00",
    ItemMaxLevel: "1,525.00",
  },
  {
    ServerName: "아만",
    CharacterName: "어익후잉",
    CharacterLevel: 60,
    CharacterClassName: "호크아이",
    ItemAvgLevel: "1,546.67",
    ItemMaxLevel: "1,546.67",
  },
  {
    ServerName: "아만",
    CharacterName: "콩후잉",
    CharacterLevel: 60,
    CharacterClassName: "인파이터",
    ItemAvgLevel: "1,475.00",
    ItemMaxLevel: "1,475.00",
  },
  {
    ServerName: "아만",
    CharacterName: "유후잉",
    CharacterLevel: 60,
    CharacterClassName: "홀리나이트",
    ItemAvgLevel: "1,566.67",
    ItemMaxLevel: "1,566.67",
  },
  {
    ServerName: "아만",
    CharacterName: "슈후잉",
    CharacterLevel: 60,
    CharacterClassName: "서머너",
    ItemAvgLevel: "1,462.50",
    ItemMaxLevel: "1,462.50",
  },
  {
    ServerName: "아만",
    CharacterName: "박후잉",
    CharacterLevel: 60,
    CharacterClassName: "블래스터",
    ItemAvgLevel: "1,600.00",
    ItemMaxLevel: "1,600.00",
  },
  {
    ServerName: "니나브",
    CharacterName: "별듦",
    CharacterLevel: 1,
    CharacterClassName: "스페셜리스트",
    ItemAvgLevel: "0.00",
    ItemMaxLevel: "0.00",
  },
  {
    ServerName: "니나브",
    CharacterName: "HiHeIIo",
    CharacterLevel: 1,
    CharacterClassName: "마법사",
    ItemAvgLevel: "0.00",
    ItemMaxLevel: "0.00",
  },
];
const TestPage = () => {
  useEffect(() => {
    console.log(makeDataResult(data));
  });
  return <div>test</div>;
};

export default TestPage;
