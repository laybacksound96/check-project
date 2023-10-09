import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalConfigContentsAtom } from "../atoms/modal";
import { Accounts } from "../atoms/data";
import { useRouteLoaderData } from "react-router-dom";
import { loadToken } from "../util/auth";
import { changeCharacterVisible } from "./Functions/changeFunctions";
import { patchOrder } from "../util/fetch";
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
const ButtonConfigContent = ({
  accountIndex,
  characterName,
}: {
  accountIndex: number;
  characterName: string;
}) => {
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const openModal = useSetRecoilState(ModalConfigContentsAtom);
  const loggined = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  const account_id = accounts[accountIndex]._id;
  const handleVisible = async () => {
    const account = accounts.find(({ _id }) => _id === account_id);
    const accountIndex = accounts.findIndex(({ _id }) => _id === account_id);
    if (!account || accountIndex === -1) return;
    const newOrder = changeCharacterVisible(
      account.characterOrder,
      characterName
    );
    const newAccount = await patchOrder(account._id, {
      name: "characterOrder",
      order: newOrder,
    });
    if (!newAccount) return;
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
