import { useRecoilValue } from "recoil";
import { CharacterState } from "../../atoms";
import Horizontal from "./Horizontal/Horizontal";

function CheckBox() {
  const accounts = useRecoilValue(CharacterState);
  return (
    <>
      {accounts.map((account, index) => {
        return (
          <Horizontal
            account={account}
            key={account.Characters[0]}
            index={index}
          />
        );
      })}
    </>
  );
}

export default CheckBox;
