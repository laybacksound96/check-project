import { useRecoilValue } from "recoil";
import { CharacterSetting } from "../../../atoms/Settings/CharacterSetting";
import { ContentSetting } from "../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../atoms/Settings/Gates";
import CalculateAccountGold from "../Functions/CalculateAccountGold";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  svg {
    margin-right: 5px;
    path {
      color: yellow;
    }
  }
  span {
    font-size: 1.5rem;
    &.total-gold {
      font-size: 1.3rem;
      opacity: 70%;
    }
  }
`;
const AccountGold = () => {
  const characterSetting = useRecoilValue(CharacterSetting);
  const contentSetting = useRecoilValue(ContentSetting);
  const gates = useRecoilValue(Gates);

  const [gold, setGold] = useState(
    CalculateAccountGold(characterSetting, contentSetting, gates, false)
  );
  const [PrevGold, setPrevGold] = useState(gold);

  useEffect(() => {
    setGold((prev) => {
      setPrevGold(prev);
      return CalculateAccountGold(
        characterSetting,
        contentSetting,
        gates,
        false
      );
    });
  }, [characterSetting, contentSetting, gates]);
  return (
    <Container>
      <FontAwesomeIcon icon={faCoins} />
      <CountUp start={PrevGold} end={gold} />
      <span className="total-gold">/</span>
      <CountUp
        end={CalculateAccountGold(
          characterSetting,
          contentSetting,
          gates,
          true
        )}
        className="total-gold"
      />
    </Container>
  );
};

export default AccountGold;
