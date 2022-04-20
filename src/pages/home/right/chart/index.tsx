import { Select } from '@arco-design/web-react';
import { memo,  useMemo } from 'react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './index.module.less';
import { formatter } from '@/utils/time'
interface IOnePingStatus {
  time: number, 
  pingTime: number, 
  status: 'success' | 'error'
}
interface IChartStatus {
  data: IOnePingStatus[],
}

const options = [1000, 3000, 5000, 10000];
const Option = Select.Option;
const StatusChart = ({ data }: IChartStatus) => {

  const [number, setNumber] = useState<number>(options[0]); // 图展示的数量

  const maxResponseTime = useMemo(() => {
    return Math.max(...data.map(item => item.pingTime))
  }, [data]);

  const showData = useMemo(() => {
    let a: { errorTime: number | null; successTime?: number | null; status: string; time: number; pingTime: number | null; }[] = [];
    let lastStatus = '';
    const step = (data.length > 1) ? (data[1].time - data[0].time) : 0;

    data.forEach(item => {
      if (item.status === 'success') {
        a.push({ ...item, errorTime: null, successTime: item.pingTime });
      } else {
        if (lastStatus === 'error') {
          a.push({ ...item, errorTime: maxResponseTime || 1, successTime: null });
        } else {
          a.push({ ...item, time: item.time - step / 2, errorTime: maxResponseTime, successTime: null }, { ...item, time: item.time + step / 2, errorTime: maxResponseTime, successTime: null });
        }
      }
      lastStatus = item.status;
    });
    return a as (IOnePingStatus & { successTime: number, errorTime: number })[];
  }, [data, maxResponseTime]);

  const unitX = useMemo(() => {
    if (data.length < 2) return 's';
    const difference = (data[data.length - 1].time - data[0].time) * 1000;
    if (difference >= 24 * 60 * 60 * 1000) return 'd'
    if (difference >= 60 * 1000) return 'h'
    return 's'
  }, [data]);

  return (
    <div className={styles.charts}>
      <div className={styles.charts_title}>
        <Select
          style={{ width: 154 }}
          defaultValue={options[0]}
          onChange={(value) => setNumber(value)}
        >
          {options.map((option, index) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ padding: '20px 0px', minWidth: '400px', maxWidth: '900px', height: '200px' }}>
        <ResponsiveContainer>
          <AreaChart
            width={400}
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
              type={'number'}
              interval={'preserveStart'}
              tickCount={10}
              tickFormatter={(value: any) => {
                return formatter(unitX, value);
              }}
              domain={[Math.min(...data.map(item => item.time)), Math.max(...data.map(item => item.time))]}
            />
            <YAxis type={'number'} tickCount={10} domain={[0, 'dataMax']} />
            <Tooltip formatter={(value: any, name: any, props: any) => `${value} ms`} labelFormatter={(label: any, payload: any) => {
              payload = payload ? payload : [];
              if (!payload[0]?.payload?.time) return null;
              return <span>{formatter(unitX, payload[0].payload.time)}</span>
            }
            } />
            {/* <Tooltip content={renderTooltipContent} /> */}
            <Area type="monotone" dataKey="errorTime" fill="#eb8b95" stroke='#eb8b9' />
            <Area type="monotone" dataKey="successTime" fill="#daf8e6" stroke='#5cdd8b' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}

export default memo(StatusChart);