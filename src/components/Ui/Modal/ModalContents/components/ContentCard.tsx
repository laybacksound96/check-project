import styled from "styled-components";
import { IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

import { faEye } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.Color_4};
  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  span {
    margin: 0px 20px;
  }
  svg {
    margin-top: 5px;
    font-size: 30px;
    color: #06d6a0;
    vertical-align: text-top;
    opacity: 40%;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    li {
      font-size: 25px;
    }
  }
`;
const GateContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.Color_2};
  padding-bottom: 5px;
  padding-left: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const CheckBox = styled.div``;
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;
interface IProps {
  ContentsName: string;
  Gates: IGates[];
}
const GateNumber = styled.span`
  font-size: 50px;
  text-align: center;
`;
const DifficultyContainer = styled.div`
  padding: 5px;
`;
const GateNumberContainer = styled.div`
  display: flex;
`;
const DifficultySpan = styled.span`
  background-color: ${(props) => props.theme.Color_4};
  border-radius: 5px;
  padding: 5px;
`;
function onClickHandler() {}
const ContentCard = ({ Gates, ContentsName }: IProps) => {
  const [Difficulty, setDifficulty] = useState();
  return (
    <ContentList>
      <CardHeader>
        <h1>{ContentsName}</h1>
        <FontAwesomeIcon icon={faEye} />
      </CardHeader>
      <Card>
        {Gates.map((gate, index) => {
          const Difficulty = gate.Difficulty;
          return (
            <GateContainer
              key={index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <GateNumberContainer
                style={{ display: "flex", flexDirection: "column" }}
              >
                <GateNumber>{gate.Gate_No}</GateNumber>
                <DifficultySpan>{Difficulty}</DifficultySpan>
              </GateNumberContainer>

              <DifficultyContainer>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ fontSize: "1.2rem", marginRight: "2px" }}
                  />
                </div>
                <div style={{ display: "flex", margin: "10px 0" }}>
                  <CheckBoxContainer>
                    <span>normal</span>
                    <CheckBox onClick={onClickHandler}>
                      {Difficulty === "normal" ? (
                        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
                      ) : (
                        <FontAwesomeIcon icon={faSquare} size="lg" />
                      )}
                    </CheckBox>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <span>hard</span>
                    <CheckBox onClick={onClickHandler}>
                      {Difficulty === "hard" ? (
                        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
                      ) : (
                        <FontAwesomeIcon icon={faSquare} size="lg" />
                      )}
                    </CheckBox>
                  </CheckBoxContainer>
                </div>
              </DifficultyContainer>
            </GateContainer>
          );
        })}
      </Card>
    </ContentList>
  );
};
export default ContentCard;
