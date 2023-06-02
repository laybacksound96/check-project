const CountGates = (content: string) => {
  const gateCounts: { [key: string]: number } = {
    아브렐슈드: 6,
    쿠크세이튼: 3,
    비아키스: 3,
    일리아칸: 3,
    발탄: 2,
  };

  return gateCounts[content] || 1;
};

export default CountGates;
