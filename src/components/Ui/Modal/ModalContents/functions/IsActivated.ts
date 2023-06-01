const IsActivated = (content: string, level: number, gateNumber: number) => {
  if (content === "아브렐슈드") {
    if (level >= 1430) {
    }
  }
  if (content === "쿠크세이튼" || "비아키스" || "일리아칸") return 3;
  if (content === "발탄") return 2;
  return 1;
};

export default IsActivated;
