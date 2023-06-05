import styled from "styled-components";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";

interface IProps {
  Difficulty: string | undefined;
  Gate: IGates;
}
const GateContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.Color_2};
  padding-bottom: 5px;
  padding-left: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

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

const ContentCardGate = ({ Difficulty, Gate }: IProps) => {
  return (
    <GateContainer>
      <GateNumberContainer style={{ display: "flex", flexDirection: "column" }}>
        <GateNumber>{Gate.Gate_No}</GateNumber>
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
          <ContentCardCheckBox difficulty={"hard"} />
          <ContentCardCheckBox difficulty={"normal"} />
        </div>
      </DifficultyContainer>
    </GateContainer>
  );
};

export default ContentCardGate;
