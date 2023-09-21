import styled from "styled-components";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const ButtonContainer = styled.div`
  flex-direction: column;
  padding: 15px;
  display: flex;
  background-color: ${(props) => props.theme.Color_3};
  border-radius: 10px;
  justify-content: start;
  align-items: center;
  width: auto;
  height: auto;
  svg {
    margin-right: 10px;
  }
  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
  }
`;
const ConfirmButton = styled.div`
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.TextColor_B};
  margin: 10px 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    transition: ease-in-out 0.1s;
  }
`;
const MenuBar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  height: auto;
  margin-bottom: 10px;
`;
interface IProps {
  handleUncheck: () => void;
}
const UncheckAllButton = ({ handleUncheck }: IProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <div></div>
    // <>
    //   {accountOrder.length > 0 && (
    //     <MenuBar>
    //       {!isConfirmed ? (
    //         <ButtonContainer onClick={() => setIsConfirmed(true)}>
    //           <div>
    //             <FontAwesomeIcon icon={faSquareCheck} size="lg" />
    //             <span>컨텐츠 일괄 체크해제</span>
    //           </div>
    //         </ButtonContainer>
    //       ) : (
    //         <ButtonContainer>
    //           <p>모든 캐릭터의 체크상태가 해제됩니다.</p>
    //           <div style={{ display: "flex", flexDirection: "row" }}>
    //             <ConfirmButton
    //               onClick={() => {
    //                 handleUncheck();
    //                 setIsConfirmed(false);
    //               }}
    //             >
    //               체크 해제
    //             </ConfirmButton>
    //             <ConfirmButton onClick={() => setIsConfirmed(false)}>
    //               취소
    //             </ConfirmButton>
    //           </div>
    //         </ButtonContainer>
    //       )}
    //     </MenuBar>
    //   )}
    // </>
  );
};
export default UncheckAllButton;
