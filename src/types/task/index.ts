export enum IStatus {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
  DEFAULT,
}

export enum IService {
  SUCCESS
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