import { memo, useEffect } from 'react';

import { IStatus } from '@/types/task';
import CardDetail from './cardDetails'
import styles from './index.module.less';
import ServiceNameplate from './serviceNameplate';
import LastStatus from './lastStatus';
import StatusTable from './statusTable';
import { TaskEventSource } from '@/api/sse';
import TaskTab from './taskTab';
import { useSelector } from 'react-redux';
import { IStatusData } from '@/store/task/type';
import { IStoreState } from '@/store/type';
import status from '../status';
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

  const tasks = useSelector<IStoreState,IStatusData>(state=>state.tasks);
  useEffect(() => {
    const fn = (ev: Event) => {
      console.log(ev);
    }
    const ev = TaskEventSource.getEventSource();
    ev.addEventListener('ping', fn);
    return () => {
      if (!ev) return;
      ev.removeEventListener('ping', fn)
      TaskEventSource.destroy();
    };
  }, []);

  return (<div className={styles.home}>
    <div className={styles.home_left}>
      <div className={styles.home_left_header}> 这里缺一个logo</div>
      <TaskTab />
    </div>
    <div className={styles.home_right}>
      {
        (
          <>
            {/* 服务铭牌 */}
      <ServiceNameplate {...server_data} />
      {/* 描述信息 */}
      <div className={styles.home_right_bottom}>
        <LastStatus taskStatus={[IStatus.SUCCESS]} />
        <div className={styles.serve_detail}>
          {
            ServeArray.map(item => <CardDetail {...item} key={`${item.desc}${item.title}`} />)
          }</div>
      </div>

      <StatusTable />
      {/* <Example /> */}
      </>
        )
      }
    
    </div>
  </div>)
};
export default memo(Home);