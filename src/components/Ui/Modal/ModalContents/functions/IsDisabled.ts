const IsDisabled = (...args: boolean[]): boolean => {
  const hasTrue = args.some((value) => value === true);
  return hasTrue;
};

export default IsDisabled;
