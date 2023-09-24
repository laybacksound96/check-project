import styled from "styled-components";
import DangerZone from "./Ui/Modal/ModalContents/components/DangerZone";
import { useRecoilState, useRecoilValue } from "recoil";
import { ModalConfigAccountAtom } from "../atoms/modal";
import ModalContainer from "./ModalContainer";
import { AccountOrder } from "../atoms/data";
import { UserState } from "../atoms/fetchData";
import SettingCharacters from "./Ui/Modal/ModalContents/components/SettingVisibleContent";
import { deleteAccount } from "../util/fetch";

const Container = styled.div`
  width: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.Color_4};
  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;

  transition: opacity 0.3s ease-in-out;
  header {
    font-size: 20px;
    margin: 5px 0 10px 0;
    svg {
      margin-right: 5px;
    }
  }
`;
const CharacterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  gap: 10px;
`;
export const ModalConfigAccount = () => {
  const [accountOrder, setAccountOrder] = useRecoilState(AccountOrder);
  const user = useRecoilValue(UserState);
  const [{ index }, closeModal] = useRecoilState(ModalConfigAccountAtom);
  function handleDelete() {
    const accountId = accountOrder[index]._id;
    if (user === "GUEST") {
      setAccountOrder((prev) => {
        const copiedPrev = [...prev];
        copiedPrev.splice(index, 1);
        return copiedPrev;
      });
    } else {
      deleteAccount(accountId).then(() => {
        setAccountOrder((prev) => {
          const copiedPrev = [...prev];
          copiedPrev.splice(index, 1);
          return copiedPrev;
        });
      });
    }
    closeModal({ status: false, index: 0 });
  }
  const { characters, characterOrder } = accountOrder[index];
  return (
    <ModalContainer
      onClose={() => closeModal({ status: false, index: 0 })}
      title={"캐릭터 표시 설정"}
    >
      <Container>
        <ContentList>
          <CharacterContainer>
            {characters.map(({ CharacterName, _id }, index) => {
              const id = _id ? _id : CharacterName + index;
              const name = user === "GUEST" ? characterOrder[0] : id;
              return (
                <SettingCharacters
                  key={CharacterName}
                  AccountName={name}
                  CharacterName={CharacterName}
                />
              );
            })}
          </CharacterContainer>
        </ContentList>
        <DangerZone handleDelete={handleDelete} />
      </Container>
    </ModalContainer>
  );
};

export default ModalConfigAccount;
