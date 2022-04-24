import { stat } from 'fs/promises';
import { memo, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
interface IOnePingStatus {
  time: number, //
  pingTime: number, //
  status: 'success' | 'error' 
}
interface IStatus {
  data: IOnePingStatus[],
}

// 模拟数据
const dataCreate = (time: number,step: number) =>{
  const a =[];
  let timer = Date.now();
  while(time --){
    const status = Math.random() < 0.001 ? 'error': 'success';
    const pingTime = Math.ceil(Math.random() * 10);
    timer = timer + step * 1000;
    a.push({
      status,
      time: timer,
      pingTime,
    });
  }
  return a;
} 



const data = dataCreate(20,30);

const Status = () => {

  const showData = useMemo(()=>{
    let a: { errorTime: number | null; successTime?: number | null; status: string; time: number; pingTime: number | null; }[] = [];
    let lastStatus = '';
    const step = data[1].time - data[0].time;

    data.forEach(item => {
      if(item.status === 'success'){
        if(lastStatus === 'success'){
          a.push({...item,errorTime: null,successTime: item.pingTime});
        }else{
          a.push({...item,time: item.time - step/2, errorTime: null,successTime: item.pingTime},{...item,time: item.time  + step/2, errorTime: null,successTime: item.pingTime});
          // a.push({...item,time: item.time, errorTime: null,pingTime: item.pingTime},{...item,time: item.time, errorTime: null,successTime: item.pingTime});
        }
      }else{
        if(lastStatus === 'error'){
          a.push({...item,errorTime: 10,successTime: null});
        }else{
          a.push({...item,time: item.time - step/2, errorTime: 10,successTime: null},{...item,time: item.time + step/2, errorTime: 10,successTime: null});
        }
      }
      lastStatus = item.status;
    });
    return a as (IOnePingStatus & {successTime: number,errorTime: number})[];
  },[]);
  console.log('[BUTTERFLY][13:23:41]', showData);
  return (
  <div style={{ padding:'50px 100px',width: '500px', height: '400px'}}>
  <ResponsiveContainer>
  <AreaChart
    width={500}
    height={200}
    data={showData}
    stackOffset="expand"
    margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0,
    }}
  >
    <CartesianGrid strokeDasharray={`1 1`} />
    <XAxis dataKey="time" interval={'preserveStart'} domain={[Math.min(...data.map(item=>item.time)),Math.max(...data.map(item=>item.time))]} />
    {/* <YAxis /> */}
    <YAxis ticks={[0,1,2,3,4,5,6,7,8,9,10]}domain={[0, 'dataMax']}/>
  
    {/* <Tooltip content={renderTooltipContent} /> */}
    <Area type="monotone" dataKey="errorTime"  fill="red" stroke='black'/>
    <Area type="monotone" dataKey="successTime"  fill="#daf8e6" stroke='#5cdd8b'/>
  </AreaChart>
</ResponsiveContainer>
  </div>

)
}

export default memo(Status);