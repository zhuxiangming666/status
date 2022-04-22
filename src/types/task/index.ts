export enum IStatus {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
  DEFAULT,
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