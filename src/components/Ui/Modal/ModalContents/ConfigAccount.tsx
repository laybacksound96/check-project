import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { useRecoilValue } from "recoil";
import { ModalState } from "../../../../atoms";

const ConfigAccount = () => {
  const { modalProp } = useRecoilValue(ModalState);
  return (
    <div>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>{modalProp === undefined ? "" : `${modalProp}`}'s Settings</h1>
      </Header>
      <hr></hr>
    </div>
  );
};

export default ConfigAccount;
