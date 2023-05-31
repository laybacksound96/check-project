const IsInValidName = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9]{1,12}$/;
  return !regex.test(name);
};

export default IsInValidName;
