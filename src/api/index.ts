import { request } from "./utils";

// 创建任务
export const createTask = (data: {kind: string,name: string,ip: string, heartbeat_time: number} )=>{
  return request({
    url: `/create`,
    method: 'post',
    data: {configs:data}
  });
}

export const testGet = ()=>{
  return request({
    url: `/hello`,
    method: 'get',
  });
}