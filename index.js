const moment = require('moment');
const momentTimezone = require('moment-timezone')
// const utc = moment.utc(new Date());


const date = new Date();
const defaultTimeZone = moment.tz.guess();
var a = moment.tz(date, defaultTimeZone);
console.log(a.toString())
const utcDate = moment.utc(a).toString();
console.log(utcDate);
const timeZonesList = moment.tz.names();

// timeZonesList.forEach(element => {
//     var a = moment.tz(date, element);
//     console.log(a.format())
// });

// const defaultTimeZone = moment.tz.guess();
// var a = moment.tz(new Date(utcDate), defaultTimeZone);
// console.log(a.toString())

// const dates = ['Sat Jun 27 2020 17:23:29 GMT+0000', 'Sat Jun 27 2021 22:53:29 GMT+0000', 'Sat Jun 27 2020 17:23:29 GMT+0000']
// const todayDate = new Date();

// const filteredEvent = dates.filter( (date) => {
//     const defaultTimeZone = moment.tz.guess();
//     console.log(todayDate.getDate(), todayDate.getMonth(), defaultTimeZone)
//     const convDate = new Date(moment.tz(new Date(date), defaultTimeZone).toString());
//     if(todayDate.getDate() === convDate.getDate()&&todayDate.getMonth() === convDate.getMonth()&&todayDate.getFullYear() === convDate.getFullYear())
//     return convDate()
// })

// console.log(filteredEvent)