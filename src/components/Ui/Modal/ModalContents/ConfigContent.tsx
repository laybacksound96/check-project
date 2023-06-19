import { useRecoilValue } from "recoil";
import { ModalState } from "../../../../atoms/modal";

export const ConfigContent = () => {
  const {
    modalProp: { AccountName },
  } = useRecoilValue(ModalState);

  return <div>{AccountName}</div>;
};

export default ConfigContent;
