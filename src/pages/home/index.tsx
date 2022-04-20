import GroupList from '@/components/GroupList';
import { IStatus } from '@/types/task';

import { memo } from 'react';
import styles from './index.module.less';
const Home = () => {
  const groupTasks = [{
    id: '1',
    name: '123',
    tasks: [{
      id: '1-1',
      name: '1-1',
      rate: 90,
      status: IStatus.SUCCESS,
    }, {
      id: '1-2',
      name: '1-2',
      rate: 80,
      status: IStatus.ERROR,
    }]
  }];
  return (<div className={styles.home}>
    <div className={styles.home_left}>
      {
        groupTasks.map(item => <GroupList taskGroup={item} />)
      }
    </div>
    <div className={styles.home_right}>right</div>
  </div>)
};
export default memo(Home);