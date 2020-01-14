/**
 * @return {string}
 */
function FormatDateTime(timeStamp,type){
  let weekDay = ['周日','周一','周二','周三','周四','周五','周六'];
  let date = new Date();
  date.setTime(timeStamp);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let week = date.getDay();
  let result;
  switch (type) {
    case 1 :
      result =  y + '年' + m + '月' + d + '日' ;
      break;
    case 2 :
      result = `${h}:${minute}`;
      break;
    case 3 :
      result = weekDay[week];
      break;
    case 4 :
      result = y + '-' + m + '-' + d+'  '+h+':'+minute+':'+second;
      break;
    default :
      return '';
  }
  return result;
}
export default FormatDateTime;
