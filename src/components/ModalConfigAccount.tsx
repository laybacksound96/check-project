import styled from "styled-components";
import DangerZone from "./Ui/Modal/ModalContents/components/DangerZone";
import { useRecoilState, useRecoilValue } from "recoil";
import { ModalConfigAccountAtom } from "../atoms/modal";
import ModalContainer from "./ModalContainer";
import SettingCharacters from "./Ui/Modal/ModalContents/components/SettingVisibleContent";
import { Accounts, Characters } from "../atoms/data";
import { deleteAccount } from "../fetch/account";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const [accountOrder, setAccountOrder] = useRecoilState(Accounts);
  const characters = useRecoilValue(Characters);
  const [{ index }, closeModal] = useRecoilState(ModalConfigAccountAtom);
  const { userId } = useParams();
  function handleDelete() {
    if (!userId) return;
    const accountId = accountOrder[index]._id;
    deleteAccount(userId, accountId).then(() => {
      setAccountOrder((prev) => {
        const copiedPrev = [...prev];
        copiedPrev.splice(index, 1);
        return copiedPrev;
      });
    });
    closeModal({ status: false, index: 0 });
  }
  const { _id, characterOrder } = accountOrder[index];
  const charactersData = characters.find(({ owner }) => owner === _id);
  if (!charactersData) return null;
  const characterData = charactersData.characters;
  return (
    <ModalContainer onClose={() => closeModal({ status: false, index: 0 })} title={"캐릭터 표시 설정"}>
      <Container>
        <ContentList>
          <CharacterContainer>
            {characterData.map((character, charIndex) => {
              const isVisible = characterOrder.includes(character.CharacterName);
              return (
                <SettingCharacters
                  key={character.CharacterName}
                  account_id={_id}
                  index={index}
                  Character={character}
                  isVisible={isVisible}
                  charIndex={charIndex}
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
