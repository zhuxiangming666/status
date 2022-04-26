import { AnyAction, Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IStoreState } from "../type";
import * as types from './actionTypes';
import { IStatusData,ITask,IPing } from "./type";

// 通用 action
export const setCommonStatus = createAction(types.SET_COMMON_STATUS, (payload: Partial<IStatusData>) => payload);

export const createTask = ({id,rate,data}:{id: string,data?: IPing[],rate?: number}) => (dispatch: Dispatch<AnyAction>,getState: () => IStoreState) => {
  const task = {taskId: id, rate: rate ? rate :0,data: data?[...data]:[]} as ITask;
  let tasks = getState().tasks.tasks;
  let tasksTmp: Map<string,ITask>;
  if(!tasks){
    tasksTmp = new Map([[id,task]]);
  }else{
    const a = new Map(tasks);
    a.set(id,task);
    tasksTmp = a;
  }
  dispatch(setCommonStatus({ tasks: tasksTmp}));
};

export const getSinglePing = ({taskId,rate,data}:{taskId: string,rate: number,data: IPing}) => (dispatch: Dispatch<AnyAction>,getState: () => IStatusData) =>{
  const originTasks = getState().tasks;
  if(!originTasks) return;
  const status = originTasks.get(taskId);
  if(!status) return;
  const statusTmp = {...status,rate: (rate?rate:status.rate),data: [...status.data,data]}
  let tasksTmp: Map<string,ITask>;
  tasksTmp = new Map(originTasks);
  tasksTmp.set(taskId,statusTmp);
  dispatch(setCommonStatus({ tasks: tasksTmp}));
}