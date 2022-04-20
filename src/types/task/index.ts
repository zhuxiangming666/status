export enum IStatus {
  SUCCESS,
  ERROR,
  WARNING
}

export interface ITask {
  name: string;
  id: string;
  rate: number;
  status: IStatus
}

export interface ITaskGroup {
  id: string;
  name: string;
  tasks: ITask[];
}