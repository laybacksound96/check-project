import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const GoldContainer = styled.div`
  svg {
    margin-right: 5px;
  }
  * {
    font-size: 0.9rem;
    opacity: 40%;
  }
  padding-left: 10px;
  margin-right: 5px;
  margin-bottom: 8px;
`;

const CharacterGold = () => {
  const [gold, setGold] = useState(0);
  const [PrevGold, setPrevGold] = useState(gold);
  return (
    <GoldContainer>
      <FontAwesomeIcon icon={faCoins} />
      <span>
        <CountUp start={PrevGold} end={gold} />
      </span>
    </GoldContainer>
  );
};
export default CharacterGold;
