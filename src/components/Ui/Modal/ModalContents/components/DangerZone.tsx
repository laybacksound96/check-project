import { useState } from "react";
import styled from "styled-components";
import { vibration } from "../AddContent";

const DangerZoneContainer = styled.div`
  margin: 20px;
`;
const DeleteAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #981616;
  background-color: ${(props) => props.theme.Color_4};
  border-radius: 5px;
  width: auto;
  height: auto;
  padding: 10px;
  margin-top: 10px;
  section {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 500;
      margin-bottom: 2px;
    }
    p {
      color: ${(props) => props.theme.TextColor_A};
      opacity: 80%;
      margin-left: 3px;
      font-size: 0.8rem;
    }
  }
`;
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  button {
    width: 80px;
    height: 30px;
    border-radius: 10px;
  }
`;
const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-bottom: 5px;
  }
`;

const DeleteBtn = styled.button`
  color: #ff0000;
  border: 1px solid #ff0000;
  background-color: ${(props) => props.theme.Color_1};
  &:hover {
    animation: ${vibration} 0.1s infinite linear;
    background-color: #981616;
    color: #ffffff;
  }
`;

const CancleBtn = styled.button`
  color: ${(props) => props.theme.TextColor_A};
  border: 1px solid #ffffff;
  background-color: ${(props) => props.theme.Color_1};
  &:hover {
    background-color: #ffffff;
    color: black;
  }
`;
const DeleteButton = styled.button`
  outline: none;
  color: #ff0000;
  display: flex;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.Color_1};
  border: 1px solid ${(props) => props.theme.TextColor_A};
  &:hover {
    background-color: #981616;
    color: #ffffff;
  }
`;
const DeleteContainer = styled.div`
  display: flex;
  width: 200px;
  height: 50px;
`;
const DangerZone = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <DangerZoneContainer>
      <span>Danger</span>
      <DeleteAccount>
        <section>
          <span>계정 제거하기</span>
          <p>
            시트에서 계정을 제거합니다. <br />
            저장한 설정들은 복구되지 않습니다.
          </p>
        </section>
        <DeleteContainer>
          {!isConfirmed ? (
            <DeleteButton onClick={() => setIsConfirmed(true)}>
              <span>계정 제거하기</span>
            </DeleteButton>
          ) : (
            <ConfirmBox
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>확실합니까?</span>
              <ButtonBox>
                <DeleteBtn onClick={() => {}}>삭제</DeleteBtn>
                <CancleBtn onClick={() => setIsConfirmed(false)}>
                  취소
                </CancleBtn>
              </ButtonBox>
            </ConfirmBox>
          )}
        </DeleteContainer>
      </DeleteAccount>
    </DangerZoneContainer>
  );
};

export default DangerZone;
