import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckBoxContainer, Container, HeaderBox } from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";

import Contents from "../components/Contents";
import Modal from "../components/Ui/Modal/Modal";
import { useRecoilState } from "recoil";
import { ModalEnum, ModalState } from "../atoms";
import { AddContent } from "../components/Ui/Modal/ModalContents";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();
  const [IsModalOpen, setIsModalOpen] = useRecoilState(ModalState);

  const closeModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };

  return (
    <>
      <Modal onClose={closeModal} onOpen={IsModalOpen.isModalOpen}>
        {ModalEnum.ADD_CONTENT && <AddContent />}
      </Modal>
      <HeaderBox>
        <h1>{userId}님의 Sheet</h1>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <hr></hr>
        <Contents />
      </HeaderBox>
      <Container>
        <CheckBoxContainer>
          <Vertical />
          <CheckBox />
        </CheckBoxContainer>
      </Container>
    </>
  );
}

export default Dashboard;
