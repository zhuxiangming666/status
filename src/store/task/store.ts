/** @format */

import { IStatusData, ITask } from './type';

// const initialState: IStatusData = {
//   activeId: '',
//   activeGroup: '',
//   tasks: null,
// };

const a = new Map([['1',{
  taskId: '1',
  rate: 50,
  name: 'test',
  data: [],
}],['2',{
  taskId: '2',
  rate: 50,
  name: 'testMing',
  data: []
}],['3',{
  taskId: '3',
  rate: 50,
  name: 'test',
  data: [],
}],['4',{
  taskId: '4',
  rate: 50,
  name: 'testMing',
  data: []
}]]);
const initialState: IStatusData = {
  activeId: '',
  activeGroup: '',
  tasks: a
};


export default initialState;
