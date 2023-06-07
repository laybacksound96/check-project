import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { useRecoilValue } from "recoil";
import { CheckBoxConfig, ModalState } from "../../../../atoms";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";

const Container = styled.div`
  width: auto;
  height: 80vh;
  display: flex;
  position: block;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
`;
const GridContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 가로로 2개의 열을 생성합니다 */
  grid-auto-rows: minmax(100px, auto); /* 세로로 자유로운 높이를 가집니다 */
  grid-gap: 10px; /* 그리드 아이템 사이의 간격을 조정합니다 */
`;

const ConfigAccount = () => {
  const { modalProp: ChracterName } = useRecoilValue(ModalState);
  const { [`${ChracterName}`]: contentsState } = useRecoilValue(CheckBoxConfig);

  const ContentNames = Object.keys(contentsState);

  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>{ChracterName && `${ChracterName}`}'s Settings</h1>
      </Header>
      <GridContainer>
        {ContentNames.map((ContentName) => {
          const { Gates, isVisible } = contentsState[ContentName];
          return (
            Gates && (
              <ContentCard
                key={ContentName}
                Gates={Gates}
                ContentsName={ContentName}
                ChracterName={ChracterName || ""}
                isVisible={isVisible}
              />
            )
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default ConfigAccount;
