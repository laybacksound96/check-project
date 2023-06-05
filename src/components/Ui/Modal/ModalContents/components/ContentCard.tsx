import styled from "styled-components";
import { IGates } from "../../../../../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.Color_4};
  padding: 10px;
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
  align-items: center;
  justify-content: space-between;
  span {
    margin: 0px 20px;
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
const CheckBox = styled.div``;
interface IProps {
  ContentsName: string;
  Gates: IGates[];
}
function onClickHandler() {}
const ContentCard = ({ Gates, ContentsName }: IProps) => {
  return (
    <ContentList>
      <CardHeader>
        <h1>{ContentsName}</h1>
        <span>눈</span>
      </CardHeader>
      <Card>
        {Gates &&
          Gates.map((gate) => {
            return (
              <ul style={{ display: "flex", alignItems: "center" }}>
                <li>{gate.Gate_No}</li>
                <CheckBox onClick={onClickHandler}>
                  <FontAwesomeIcon icon={faSquareCheck} size="lg" />

                  <FontAwesomeIcon icon={faSquare} size="lg" />
                </CheckBox>
              </ul>
            );
          })}
      </Card>
    </ContentList>
  );
};
export default ContentCard;
