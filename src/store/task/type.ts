export enum IStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IPing {
  status: IStatus,
  pingTime?: number,
  time?: number,
}

export type IPingData = IPing & {rate : number};

export interface ITask {
  taskId: string,
  name: string,
  rate: number,
  data: IPing[],
}

export interface IStatusData {
  activeId: string,
  activeGroup: string,
  tasks: Map<string,ITask> | null,
}