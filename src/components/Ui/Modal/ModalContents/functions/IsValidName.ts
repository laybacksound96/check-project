const IsInValidName = (name: string): boolean => {
  const regex = /^(?!.*[ㄱ-ㅎㅏ-ㅣ])[가-힣a-zA-Z0-9]{1,12}$/;
  return !regex.test(name);
};

export default IsInValidName;
