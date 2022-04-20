import { memo,useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
interface IOnePingStatus {
  time: number, 
  pingTime: number, 
  status: 'success' | 'error'
}

// 模拟数据
const dataCreate = (time: number, step: number) => {
  const a = [];
  let timer = Date.now();
  while (time--) {
    const status = Math.random() < 0.1 ? 'error' : 'success';
    const pingTime = Math.ceil(Math.random() * 100);
    timer = timer + step * 1000;
    a.push({
      status,
      time: timer,
      pingTime,
    });
  }
  return a;
}



const data = dataCreate(100, 30);

const Status = () => {


  const maxResponseTime = useMemo(() => {
    return Math.max(...data.map(item => item.pingTime))
  }, []);

  const showData = useMemo(() => {
    let a: { errorTime: number | null; successTime?: number | null; status: string; time: number; pingTime: number | null; }[] = [];
    let lastStatus = '';
    const step = data[1].time - data[0].time;

    data.forEach(item => {
      if (item.status === 'success') {
        a.push({ ...item, errorTime: null, successTime: item.pingTime });
      } else {
        if (lastStatus === 'error') {
          a.push({ ...item, errorTime: maxResponseTime, successTime: null });
        } else {
          a.push({ ...item, time: item.time - step / 2, errorTime: maxResponseTime, successTime: null }, { ...item, time: item.time + step / 2, errorTime: maxResponseTime, successTime: null });
        }
      }
      lastStatus = item.status;
    });
    return a as (IOnePingStatus & { successTime: number, errorTime: number })[];
  }, [maxResponseTime]);

  return (
    <div style={{ padding: '50px 100px', width: '900px', height: '400px' }}>
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
          <XAxis
            dataKey="time"
            interval={'preserveStart'}
            domain={[Math.min(...data.map(item => item.time)), Math.max(...data.map(item => item.time))]}
          />
          <YAxis type={'number'} tickCount={10} domain={[0, 'dataMax']} />
          <Tooltip formatter={(value: any, name: any, props: any) => `${value} ms`} labelFormatter={(label: any, payload: any) => {
            payload = payload ? payload : [];
            if (!payload[0]?.payload?.time) return null;
            return <span>{new Date(payload[0].payload.time).toLocaleString('chinese', { hour12: false })}</span>
          }
          } />
          {/* <Tooltip content={renderTooltipContent} /> */}
          <Area type="monotone" dataKey="errorTime" fill="#eb8b95" stroke='#eb8b9' />
          <Area type="monotone" dataKey="successTime" fill="#daf8e6" stroke='#5cdd8b' />
        </AreaChart>
      </ResponsiveContainer>
    </div>

  )
}

export default memo(Status);