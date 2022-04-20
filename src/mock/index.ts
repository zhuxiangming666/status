import { IPing, IStatusData } from "@/store/task/type";

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
      time: timer /1000,
      pingTime,
    });
  }
  return a;
}


const data = dataCreate(100, 30);

const a = new Map([['1',{
  taskId: '1',
  rate: 50,
  name: 'test',
  heartBeat: 1,
  data: data as IPing[],
}],['2',{
  taskId: '2',
  rate: 50,
  name: 'testMing',
  heartBeat: 1,
  data: []
}],['3',{
  taskId: '3',
  rate: 50,
  name: 'test',
  heartBeat: 1,
  data: [],
}],['4',{
  taskId: '4',
  rate: 50,
  name: 'testMing',
  heartBeat: 1,
  data: []
}]]);
const initialState: IStatusData = {
  activeId: '',
  activeGroup: '',
  tasks: a
};
export default initialState