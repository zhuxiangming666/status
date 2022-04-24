import { Button } from '@arco-design/web-react';
import { memo, useMemo } from 'react';
import className from 'classnames'
import styles from './index.module.less';

import { IStatus } from '@/types/task';

const StatusItem = ({status}: {status: IStatus}) =>{
  const statusClass = useMemo(()=>{
    switch (status) {
      case IStatus.SUCCESS:
        return styles.success;
      case IStatus.ERROR:
        return styles.error;
      default:
        return styles.default;
    }
  },[status]);
  return <span className={className(styles.status_item,statusClass)} />;
} 

interface IProps{
  taskStatus: IStatus[],
}
type IButtonStatus = 'success'|'danger';
const LastStatus = ({taskStatus}:IProps) =>{
  const taskStatusDefault = useMemo(()=>{
    // 数组长度不足时填充 元素 
    if(taskStatus.length < 50) return taskStatus.concat(Array(50-taskStatus.length).fill(IStatus.DEFAULT));
    return taskStatus;
  },[taskStatus]);

  // 获取最近一次的转态
  const {type,text} = useMemo(():{text:string,type: IButtonStatus }=>{
    if (taskStatus[taskStatus.length-1] === IStatus.SUCCESS) return {text: '正常',type: 'success'} ;
    return {text: '异常',type: 'danger'}
  },[taskStatus]);

  return <div className={styles.last_status}>
    <div className={styles.last_status_left}>
      <div className={styles.status_block}>
        {taskStatusDefault.map((item,index)=><StatusItem status={item} key={index}/>)}
      </div>
      <div className={styles.status_text}>{'检测频率60s'}</div>
    </div>
    <div className={styles.last_status_right}>
      <Button status={type} shape='round' size='large'>{text}</Button>
    </div>
  </div>
}
export default memo(LastStatus);
