import { AnyAction, Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IStoreState } from "../type";
import * as types from './actionTypes';
import { IStatusData,ITask,IPing } from "./type";

// 通用 action
export const setCommonStatus = createAction(types.SET_COMMON_STATUS, (payload: Partial<IStatusData>) => payload);

export const createTask = ({taskId,rate,data,name}: ITask) => (dispatch: Dispatch<AnyAction>,getState: () => IStoreState) => {
  const task = {taskId: taskId, rate: rate ? rate :0,data: data?[...data]:[],name} as ITask;
  let tasks = getState().tasks.tasks;
  let tasksTmp: Map<string,ITask>;
  if(!tasks){
    tasksTmp = new Map([[taskId,task]]);
  }else{
    tasksTmp = new Map(tasks);
    tasksTmp.set(taskId,task);
  }
  dispatch(setCommonStatus({ tasks: tasksTmp}));
};

export const getSinglePing = ({taskId,rate,data}:{taskId: string,rate: number,data: IPing}) => (dispatch: Dispatch<AnyAction>,getState: () => IStoreState) =>{
  console.log(taskId,11231231,rate,data);
  const originTasks = getState().tasks.tasks;
  if(!originTasks) return;
  console.log('[buffer]',originTasks,taskId);
  const status = originTasks.get(taskId);
  if(!status) return;
  const statusTmp = {...status,rate: (typeof rate === 'number'?rate:status.rate),data: [...status.data,data]}
  let tasksTmp: Map<string,ITask>;
  tasksTmp = new Map(originTasks);
  tasksTmp.set(taskId,statusTmp);
  dispatch(setCommonStatus({ tasks: tasksTmp}));
}

export const setActiveId = (id: string) => (dispatch: Dispatch<AnyAction>)=> dispatch(setCommonStatus({  activeId: id }));


export const initTasksList = (tasks: ITask[]) => (dispatch: Dispatch<AnyAction>) => {
  let tasksTmp: Map<string,ITask>;
  const taskMapArr:[string,ITask][] = tasks.map(task =>[task.taskId,task]);
  tasksTmp = new Map(taskMapArr);
  dispatch(setCommonStatus({ tasks: tasksTmp}));
}