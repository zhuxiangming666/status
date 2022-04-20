import { IStatus } from "@/store/task/type";

export const groupTasks = [{
  id: '1',
  name: '123',
  tasks: [{
    id: '1-1',
    name: '1-1',
    rate: 90,
    status: IStatus.SUCCESS,
  }, {
    id: '1-2',
    name: '1-2',
    rate: 80,
    status: IStatus.ERROR,
  }]
}];