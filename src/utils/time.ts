export const formatter = (type: 'h'|'d'|'s',time: number) =>{
 const timer = new Date(time*1000);
 const month = timer.getMonth() + 1;
 const  day = timer.getDate();
 const hour = timer.getHours();
 const minutes = timer.getMinutes();
 const second = timer.getSeconds();
 const addSuffix = (cur: number,order=10) => cur < order ? `0${cur}`:`${cur}`;
  var o = {
    'M': addSuffix(month,10),
    'D': addSuffix(day,10),
    'h': addSuffix(hour,10),
    'm': addSuffix(minutes,10),
    's': addSuffix(second,10)
  }
  switch (type) {
    case 'h':
      return `${o.h}:${o.m}`
    case 'd': 
      return `${o.M}/${o.D} ${o.h}:${o.m}`
    case 's':
      return `${o.h}:${o.m}:${o.s}`
    default:
      return 'NAN'
  }
}

export const formatNumber = (str: string,num: number) =>{
  const tmp = isNaN(Number(str)) ? 0 : Number(str) * 100;
  return Number(tmp.toFixed(num));
}