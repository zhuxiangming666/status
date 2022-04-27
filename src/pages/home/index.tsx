import { memo, useEffect, useMemo } from 'react';

import CardDetail from './cardDetails'
import styles from './index.module.less';
import ServiceNameplate from './serviceNameplate';
import LastStatus from './lastStatus';
import StatusTable from './statusTable';
import { TaskEventSource } from '@/api/sse';
import TaskTab from './taskTab';
import { useDispatch, useSelector } from 'react-redux';
import { IStatus, IStatusData } from '@/store/task/type';
import { IStoreState } from '@/store/type';
import status from '../status';
import { getSinglePing } from '@/store/task/action';
import { getAllTaskList } from '@/api';
import StatusChart from './right/chart'
// import AlertMessage from '@/components/AlertMessage'
const ServeArray = [{
  title: '响应',
  desc: '(当前)',
  data: '816 ms',
}, {
  title: '平均响应',
  desc: '24小时',
  data: '899 ms',
}, {
  title: '在线时间',
  desc: '24小时',
  data: '100%',
}, {
  title: '在线时间',
  desc: '(30天)',
  data: '99.36%',
}, {
  title: '证书有效期',
  desc: '(2023-03-16)',
  data: '330 天',
}]

const server_data = {
  principal: '杨进豪',
  failureRule: '连续1000次检查失败',
  time: '2020-05-15'
};

const Home = () => {

  const taskarr = useSelector<IStoreState, IStatusData>(state => state.tasks);
  const { activeId, tasks } = taskarr;
  const dispatch = useDispatch();

  const curTask = useMemo(() => {
    if (!tasks) return;
    return tasks.get(activeId);
  }, [activeId, tasks]);

  // get taskList
  useEffect(() => {
    const fetch = async () => {
      const data = await getAllTaskList();
      console.log('[123123]', data);
    }
    fetch();
    // const list = fetch();
    // const list = await getAllTaskList();
    // console.log(list);
  }, []);

  useEffect(() => {
    const fn = (ev: any) => {
      let data: any = ev.data;
      try {
        data = JSON.parse(ev.data);
      } catch (e) {
        return;
      }


      const ipingTmp = { status: data.Ready ? IStatus.SUCCESS : IStatus.ERROR, time: data.RequestTime, pingTime: data.ResponseDuration };
      const taskId = data.CallID;
      dispatch(getSinglePing({ taskId, rate: data.Sla, data: ipingTmp }))
    }
    const ev = TaskEventSource.getEventSource();
    ev.addEventListener('ping', fn);
    return () => {
      if (!ev) return;
      ev.removeEventListener('ping', fn)
      TaskEventSource.destroy();
    };
  }, [dispatch]);

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
              <LastStatus taskStatus={curTask.data.map(item => item.status)} />
              {/* <div className={styles.serve_detail}>
                {
                  curTask.data.map(item => <CardDetail {...item} key={`${item.desc}${item.title}`} />)
                }</div> */}
            </div>
            
            <StatusChart data={curTask.data.map(item=>({time: item.time,status: item.status,pingTime: item.time}))}/>
            <StatusTable />
            
            {/* <Example /> */}
          </>
        )
      }

    </div>
  </div>)
};
export default memo(Home);