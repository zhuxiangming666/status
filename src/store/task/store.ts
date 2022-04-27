/** @format */

import { IPing, IStatusData} from './type';

const initialState: IStatusData = {
  activeId: '',
  activeGroup: '',
  tasks: null,
};
// import data from '../../mock/index'
// const a = new Map([['1',{
//   taskId: '1',
//   rate: 50,
//   name: 'test',
//   heartBeat: 1,
//   data: data as IPing[],
// }],['2',{
//   taskId: '2',
//   rate: 50,
//   name: 'testMing',
//   heartBeat: 1,
//   data: []
// }],['3',{
//   taskId: '3',
//   rate: 50,
//   name: 'test',
//   heartBeat: 1,
//   data: [],
// }],['4',{
//   taskId: '4',
//   rate: 50,
//   name: 'testMing',
//   heartBeat: 1,
//   data: []
// }]]);
// const initialState: IStatusData = {
//   activeId: '',
//   activeGroup: '',
//   tasks: a
// };

// console.log('12312231',a);

export default initialState;
