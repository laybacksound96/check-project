const IsValidLevel = (ContentName: string, level: number) => {
  if (ContentName === "아브렐슈드") {
    if (level >= 1520) return true;
    return false;
  }
  if (ContentName === "쿠크세이튼") {
    if (level >= 1475) return true;
    return false;
  }
  if (ContentName === "비아키스") {
    if (level >= 1445) return true;
    return false;
  }
  if (ContentName === "발탄") {
    if (level >= 1415) return true;
    return false;
  }
  return true;
};

export default IsValidLevel;
