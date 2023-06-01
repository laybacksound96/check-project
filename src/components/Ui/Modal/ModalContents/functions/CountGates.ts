const CountGates = (content: string) => {
  if (content === "아브렐슈드") return 6;
  if (content === "쿠크세이튼" || "비아키스" || "일리아칸") return 3;
  if (content === "발탄") return 2;
  return 1;
};

export default CountGates;
