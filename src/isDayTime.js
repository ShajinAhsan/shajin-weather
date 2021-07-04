function isDayTime(params1, params2) {
  const hours = new Date().getHours();
  const isDayTime = hours > params1 && hours < params2;
  return isDayTime;
}
export default isDayTime;
// console.log(new Date().getHours());
