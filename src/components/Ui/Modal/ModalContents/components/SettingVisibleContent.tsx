import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.1rem;
    margin-bottom: 0px;
    svg {
      font-size: 0.9rem;
      margin: 0px 5px;
      margin-bottom: 2px;
    }
  }
  span {
    color: white;
    font-size: 0.8rem;
    color: ${(props) => props.theme.TextColor_A};
    opacity: 40%;
    svg {
      margin-right: 3px;
    }
  }
`;
interface IStyel {
  isVisible: boolean;
}
export const Character = styled.div<IStyel>`
  opacity: ${(props) => (props.isVisible ? "100%" : "20%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 7px;
  font-size: 17px;
  height: auto;
  border-radius: 5px;
  background-color: rgba(100, 100, 100, 0.1);
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 70%;
    }
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-right: 10px;
  svg {
    opacity: 20%;
    border-radius: 10px;
    font-size: 30px;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
interface IProps {
  AccountName: string;
  CharacterName: string;
}
const SettingCharacters = ({ AccountName, CharacterName }: IProps) => {
  const handleGoldChar = () => {};
  const handleVisible = () => {};
  return (
    <div></div>
    // <Character key={CharacterName} >
    //   <NameContainer>
    //     <h1>{CharacterName}</h1>
    //     {IsGoldCharacter && (
    //       <span>
    //         <FontAwesomeIcon icon={faCoins} color="yellow" />
    //         골드획득캐릭터
    //       </span>
    //     )}

    //     <span>{ClassName}</span>
    //     <span>Lv {Level}</span>
    //   </NameContainer>

    //   <ButtonContainer>
    //     <FontAwesomeIcon
    //       icon={faCoins}
    //       color={IsGoldCharacter ? "yellow" : "white"}
    //       onClick={() => handleGoldChar()}
    //     />

    //     <FontAwesomeIcon
    //       onClick={() => handleVisible()}
    //       icon={isVisibleChar ? faEye : faEyeSlash}
    //     />
    //   </ButtonContainer>
    // </Character>
  );
};

export default SettingCharacters;
