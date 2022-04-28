import { memo, useEffect, useMemo, useState,useCallback } from 'react';

import CardDetail from './cardDetails'
import styles from './index.module.less';
import LastStatus from './lastStatus';
import StatusTable from './statusTable';
import { TaskEventSource } from '@/api/sse';
import TaskTab from './taskTab';
import { useDispatch, useSelector } from 'react-redux';
import { IPing, IStatus, IStatusData, ITask } from '@/store/task/type';
import { IStoreState } from '@/store/type';
import { getSinglePing, initTasksList, setTaskData } from '@/store/task/action';
import { getAllTaskList, getTaskDataById } from '@/api';
import StatusChart from './right/chart'
import { formatNumber } from '@/utils/time';


const formatTime = (time: number) => new Date(time).toLocaleString('chinese', { hour12: false })
const Home = () => {

  const taskarr = useSelector<IStoreState, IStatusData>(state => state.tasks);
  const activeId = useSelector<IStoreState, string>(state => state.tasks.activeId);
  const { tasks } = taskarr;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const curTask = useMemo(() => {
    if (!tasks) return;
    return tasks.get(activeId);
  }, [activeId, tasks]);

  // get taskList
  useEffect(() => {
    const fetch = async () => {
      let taskArr: ITask[] = [];
      try {
        const data = await getAllTaskList();
        taskArr = data.instances.map((item: any) => ({
            taskId: item.call_id,
            name: item.name,
            rate: formatNumber(item.sla,2),
            data: [],
            heartBeat: item.heartbeat_time
          }))
      } catch (error) {
        console.log(error);
      }

      dispatch(initTasksList(taskArr));
    }
    fetch();
  }, [dispatch]);

  useEffect(() => {
    const fn = (ev: any) => {
      let data: any = ev.data;
      try {
        data = JSON.parse(ev.data);
      } catch (e) {
        return;
      }
      const ipingTmp = { reason: data.message, status: data.ready ? IStatus.SUCCESS : IStatus.ERROR, time: data.request_time, pingTime: data.response_duration };
      dispatch(getSinglePing({ taskId: data.call_id, rate:  formatNumber(data.sla,2), data: ipingTmp }))
    }
    const ev = TaskEventSource.getEventSource();
    ev.addEventListener('ping', fn);
    return () => {
      if (!ev) return;
      ev.removeEventListener('ping', fn)
      TaskEventSource.destroy();
    };
  }, [dispatch]);

  const ServeArray = useMemo(() => {
    return [{
      title: '响应',
      desc: '(当前)',
      data: `${curTask?.data[curTask.data.length - 1]?.pingTime || NaN} ms`,
    }, {
      title: '平均响应',
      desc: '24小时',
      data: 'NAN ms',
    }, {
      title: '在线时间',
      desc: '24小时',
      data: 'NAN/NA',
    }, {
      title: '在线时间',
      desc: '(30天)',
      data: 'NAN/NA',
    }]
  }, [curTask?.data]);



  const getTaskMsgs = useCallback((number: number)=>{
    const fetch = async () => {
      try {
        const data = await getTaskDataById(activeId,number);
        const taskId = data.call_id;
        const dataArr: IPing[] = data.events.map((item: any) => ({
          status: item.ready ? IStatus.SUCCESS : IStatus.ERROR,
          time: Number(item.request_time),
          reason: item.msg,
          pingTime: item.ping_time || 1,
        }));
        dispatch(setTaskData(taskId, dataArr));
      } catch (error) {
        console.log(error);
      }
    }
    if (!activeId) return;
    setLoading(true);
    void fetch().finally(() => {
      setLoading(false);
    });
  },[activeId,dispatch])


  useEffect(() => {
    getTaskMsgs(1000);
  }, [getTaskMsgs]);


  const message = useMemo(() => {
    if (!curTask?.data) return [];
    if (curTask.data.length > 10) {
      return curTask.data.slice(curTask.data.length - 10).map(item => ({ time: formatTime(item.time * 1000), message: item.reason || '', status: item.status })).reverse();
    }
    return curTask.data.map(item => ({ time: formatTime(item.time * 1000), message: item.reason || '', status: item.status }))
  }, [curTask?.data]);

  return (<div className={styles.home}>
    <div className={styles.home_left}>
      <div className={styles.home_left_header}> 这里缺一个logo</div>
      <TaskTab />
    </div>
    <div className={styles.home_right}>
      {
        curTask && (
          <>
            {/* 服务铭牌 */}
            {/* <ServiceNameplate {...server_data} /> */}
            {/* 描述信息 */}
            <div className={styles.home_right_bottom}>
              <LastStatus taskStatus={curTask.data.map(item => item.status)} heartBeat={curTask.heartBeat} />
              <div className={styles.serve_detail}>
                {
                  ServeArray.map(item => <CardDetail {...item} key={`${item.desc}${item.title}`} />)
                }</div>
            </div>

            <StatusChart 
              data={(curTask?.data || []).map(item => ({ time: item.time, status: item.status, pingTime: item.pingTime }))} 
              getNewMsg={getTaskMsgs}
              />
            <StatusTable data={message} />

            {/* <Example /> */}
          </>
        )
      }

    </div>
  </div>)
};
export default memo(Home);