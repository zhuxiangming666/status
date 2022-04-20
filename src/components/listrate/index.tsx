import { memo } from 'react'
import className from 'classnames';
import { ITask } from "@/store/task/type";
import { Progress } from "@arco-design/web-react"
import styles from './index.module.less';

interface IProps {
  task: ITask,
  isActive: boolean,
  clickCallback?: (taskId: string) => void,
  isLast?: boolean
}
const ListRate = ({ task, isActive, clickCallback, isLast }: IProps) => {
  const { rate, name,  taskId } = task;

  return <div
    className={className(styles.list_rate, {
      [styles.after_line]: isLast,
      [styles.active]: isActive,
    })}
    onClick={() => clickCallback?.(taskId)}>
    <div className={styles.list_rate_left}>
      <Progress width={40} trailColor={'#F53F3F'} type='circle' percent={rate} color={`#00B42A`} formatText={(num: number) => num} />
    </div>
    <div className={styles.list_rate_right}>
      <h5 className={styles.list_task_name}>{name}</h5>
      <Progress type='line' trailColor={'#F53F3F'} percent={rate} color={`#00B42A`} className={styles.list_task_line_rate}></Progress>
    </div>
  </div>
}
export default memo(ListRate);