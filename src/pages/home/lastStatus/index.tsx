import { Button } from '@arco-design/web-react';
import { memo, useMemo } from 'react';
import className from 'classnames'
import styles from './index.module.less';

import { IStatus } from '@/store/task/type';
import { useGetElementWH } from '@/hook';

const StatusItem = ({ status }: { status: IStatus }) => {
  const statusClass = useMemo(() => {
    switch (status) {
      case IStatus.SUCCESS:
        return styles.success;
      case IStatus.ERROR:
        return styles.error;
      default:
        return styles.default;
    }
  }, [status]);
  return <span className={className(styles.status_item, statusClass)} />;
}

interface IProps {
  taskStatus: IStatus[],
  heartBeat: number,
}
type IButtonStatus = 'success' | 'danger';
const LastStatus = ({ taskStatus, heartBeat }: IProps) => {
  const { elementWH, elementRef } = useGetElementWH();
  const taskStatusDefault = useMemo(() => {
    // 数组长度不足时填充 元素 
    const number = Math.floor(elementWH.w / 20) || 0;
    if (number === 0) return [];
    if (taskStatus.length < number)
      return taskStatus.concat(Array(number - taskStatus.length).fill(''));
    if (taskStatus.length > number) {
      return taskStatus.splice(taskStatus.length - number);
    }
    return taskStatus;
  }, [taskStatus, elementWH.w]);

  // 获取最近一次的转态
  const { type, text } = useMemo((): { text: string, type: IButtonStatus } => {
    if (taskStatus[taskStatus.length - 1] === IStatus.SUCCESS) return { text: '正常', type: 'success' };
    return { text: '异常', type: 'danger' }
  }, [taskStatus]);


  // 获取父节点的高度

  return <div className={styles.last_status}>
    <div className={styles.last_status_left} ref={elementRef}>
      <div className={styles.status_block}>
        {taskStatusDefault.map((item, index) => <StatusItem status={item} key={index} />)}
      </div>
      <div className={styles.status_text}>{`检测频率${heartBeat}s`}</div>
    </div>
    <div className={styles.last_status_right}>
      <Button status={type} shape='round' size='large'>{text}</Button>
    </div>
  </div>
}
export default memo(LastStatus);
