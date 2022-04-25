export interface IPing {
  status: 'success' | 'error'; // 一个报文的状态
  reason: string;// 失败的理由或者成功的状态
  time: string; // 当前时间
  pingTime: string; // 响应时间戳
}
export type ISinglePing = IPing & {taskId: string};

export interface ITask {
  taskId: string; 
  score: number; // 失败数量/成功数量
  data: IPing[]; // 当前任务的数据
}

export type ITaskGroup = {
  groupId: string,
  data: ITask[],
}

export class Task{
  private taskId: string; 
  private score: number; // 失败数量/成功数量
  private data: IPing[]; // 当前任务的数据
  constructor(taskId: string,score: number,data: IPing[]){
    this.taskId = taskId;
    this.score = score;
    this.data = data;
  }

  getData(){
    return {score:this.score,data: this.data,taskId: this.taskId};
  }

  pushSingleIPing({data,score}:{data: IPing,score: number}){
    this.data.push(data);
    this.score = score;
    return this.data;
  }

  setData({data,score}:{data:IPing[],score: number}){
    data && (this.data = data);
    score && (this.score = score);
    return this.getData();
  }
  destroy(){
    this.data = [];
  }
};

// export default class TaskGroup{
//     private groupId: string;
//     private activeTaskId: number;
//     private TaskMap: Map<string,Task>;
//     constructor(groupId) {
//       this.groupId = groupId;
//     };

//     // 
// }