const useFormatTime = (h_24) => {
  let h = h_24 % 12;
  if (h === 0) h = 12;
  return h;
};

export default useFormatTime;
