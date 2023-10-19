import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalConfigContentsAtom } from "../atoms/modal";
import { Accounts, Characters, Contents } from "../atoms/data";
import { changeCharacterVisible } from "./Functions/changeFunctions";
import { LoginState } from "../atoms/login";
import { patchOrder } from "../fetch/account";
import { useParams } from "react-router-dom";
import { patchFalseSettings } from "../fetch/contents";
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  padding-right: 5px;
  padding-top: 5px;
  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const ButtonConfigContent = ({ accountIndex, characterName }: { accountIndex: number; characterName: string }) => {
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const [characters, setCharacters] = useRecoilState(Characters);
  const [contents, setContents] = useRecoilState(Contents);
  const openModal = useSetRecoilState(ModalConfigContentsAtom);
  const loggined = useRecoilValue(LoginState);
  const account_id = accounts[accountIndex]._id;
  const { userId } = useParams();
  const handleVisible = async () => {
    if (!userId) return;
    const newOrder = changeCharacterVisible(accounts[accountIndex].characterOrder, characterName);
    const newAccount = await patchOrder(userId, account_id, {
      name: "characterOrder",
      order: newOrder,
    });
    const fetchedData = await patchFalseSettings(userId, account_id, characterName);
    if (!newAccount || !fetchedData) return;
    const { character, contents } = fetchedData;
    setCharacters((prev) => {
      const copiedPrev = [...prev];
      const index = copiedPrev.findIndex(({ owner }) => owner === account_id);
      if (index === -1) return prev;
      copiedPrev[index] = character;
      return copiedPrev;
    });
    setContents((prev) => {
      const copiedPrev = [...prev];
      const index = copiedPrev.findIndex(({ owner }) => owner === account_id);
      if (index === -1) return prev;
      copiedPrev[index] = contents;
      return copiedPrev;
    });
    setAccounts((prev) => {
      const copiedAccounts = [...prev];
      copiedAccounts[accountIndex] = newAccount;
      return copiedAccounts;
    });
    return;
  };

  return (
    <>
      {loggined && (
        <ButtonContainer>
          <FontAwesomeIcon onClick={() => handleVisible()} icon={faEye} />
          <FontAwesomeIcon
            onClick={() => {
              if (!loggined) return;
              openModal({
                status: true,
                data: { accountIndex, characterName },
              });
            }}
            icon={faGear}
            size="lg"
          />
        </ButtonContainer>
      )}
    </>
  );
};
export default ButtonConfigContent;
