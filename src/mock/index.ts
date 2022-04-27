// 模拟数据
const dataCreate = (time: number, step: number) => {
  const a = [];
  let timer = Date.now();
  while (time--) {
    const status = Math.random() < 0.1 ? 'error' : 'success';
    const pingTime = Math.ceil(Math.random() * 10);
    timer = timer + step * 1000;
    a.push({
      status,
      time: timer,
      pingTime,
    });
  }
  return a;
}


const data = dataCreate(100, 30);
console.log(data);
export default data;