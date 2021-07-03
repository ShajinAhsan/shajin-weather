const hours = new Date().getHours();
const isDayTime = hours > 6 && hours < 20;
export default isDayTime;
// console.log(isDayTime);
