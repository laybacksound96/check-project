import commander from "./commander.json";
export const makeAvailableDifficulty = (
  level: number,
  content:
    | "발탄"
    | "비아키스"
    | "쿠크세이튼"
    | "아브렐슈드"
    | "일리아칸"
    | "아르고스",
  gateNumber: number
): { ["isActivated"]: boolean; ["Difficulty"]?: "normal" | "hard" } => {
  const commanderState = 
};

export default makeAvailableDifficulty;
