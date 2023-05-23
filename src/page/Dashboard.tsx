import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckBoxContainer,
  Container,
  HeaderBox,
  PageContainer,
} from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";

import Contents from "../components/Contents";
import Modal from "../components/Ui/Modal";
import { useRecoilState } from "recoil";
import { ModalState } from "../atoms";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalState);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>모달 내용</h1>
        <p>이곳에 모달 내용을 작성할 수 있습니다.</p>
      </Modal>
      <PageContainer>
        <Container>
          <HeaderBox>
            <h1>{userId}님의 Sheet</h1>
            <FontAwesomeIcon icon={faGear} size="lg" />
            <hr></hr>
            <Contents />
          </HeaderBox>
          <CheckBoxContainer>
            <Vertical />
            <CheckBox />
          </CheckBoxContainer>
        </Container>
      </PageContainer>
    </>
  );
}

export default Dashboard;
