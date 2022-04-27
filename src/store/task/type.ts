export enum IStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IPing {
  status: IStatus,
  pingTime: number,
  time: number,
  reason?: string,
}

export type IPingData = IPing & {rate : number};

export interface ITask {
  taskId: string,
  name: string,
  rate: number,
  data: IPing[],
  heartBeat: number
}

export interface IStatusData {
  activeId: string,
  activeGroup: string,
  tasks: Map<string,ITask> | null,
}