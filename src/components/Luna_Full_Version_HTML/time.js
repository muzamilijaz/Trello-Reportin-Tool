const birthday = new Date("2020-02-25T11:51:31.005Z");
const date1 = birthday.getDate();
const getTime = birthday.getTime();
const date2 = birthday.getMinutes();
const date3 = birthday.getHours();

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60* 24)) % 30);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  days = (seconds < 10) ? "0" + days : days;

  return days + ':'+ hours + ":" + minutes + ":" + seconds;
}

const toooo = birthday.getMinutes();
const check = Math.abs(new Date("2020-02-24T11:23:30.005Z") - new Date("2020-02-23T11:51:31.005Z"));
console.log(msToTime(check))

console.log('1starg ', new Date("2020-02-20T10:23:30.005Z"))
console.log('2nd ', new Date("2020-02-24T11:23:32.005Z"))

const abc = new Date(check)
console.log(check);
console.log(abc.getMinutes(),abc.getHours());



console.log(birthday);
console.log(getTime);
console.log(date1);
console.log(date2);
console.log(date3);
// expected output: 19
