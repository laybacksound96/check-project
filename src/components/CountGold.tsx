import { useState, useEffect } from "react";
import CountUp from "react-countup";

const CountGold = ({ income }: { income: number }) => {
  const [gold, setGold] = useState(0);
  const [PrevGold, setPrevGold] = useState(gold);
  useEffect(() => {
    setGold((prev) => {
      setPrevGold(prev);
      return income;
    });
  }, [income]);
  return (
    <span>
      <CountUp start={PrevGold} end={gold} />
    </span>
  );
};

export default CountGold;
