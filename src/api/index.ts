import { request } from "./utils";

// 创建任务
export const createTask = (data: {kind: string,name: string,ip: string, heartbeat_time: number} )=>{
  return request({
    url: `/create`,
    method: 'post',
    data: {configs:data}
  });
}

export const getAllTaskList = ()=>{
  return request({
    url: `/list`,
    method: 'get',
  });
}

export const getTaskDataById = (id:string,num: number) => {
  return request({
    url: `/events/${id}/${num}`,
    method: 'get',
  })
}