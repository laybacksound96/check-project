import { useRecoilValue } from "recoil";
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
    font-size: 1.9rem;
    &.total-gold {
      font-size: 1.7rem;
      opacity: 70%;
    }
  }
`;
const AccountGold = () => {
  return (
    <div></div>
    // <Container>
    //   <FontAwesomeIcon icon={faCoins} />
    //   <CountUp start={PrevGold} end={gold} />
    //   <span className="total-gold">/</span>
    //   <CountUp
    //     end={CalculateAccountGold(
    //       characterSetting,
    //       contentSetting,
    //       gates,
    //       true
    //     )}
    //     className="total-gold"
    //   />
    // </Container>
  );
};

export default AccountGold;
