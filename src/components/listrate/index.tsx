import { memo } from 'react'
import className from 'classnames';
import { IStatus, ITask } from "@/types/task"
import { Progress } from "@arco-design/web-react"
import styles from './index.module.less';

interface IProps {
  task: ITask,
  isActive: boolean,
  clickCallback?: (taskId: string) =>void,
  isLast?: boolean
}
const ListRate = ({ task,isActive,clickCallback,isLast }: IProps) => {
  const { rate, name, status,id } = task;
  const color = status === IStatus.SUCCESS ? '#F53F3F' : '#00B42A'
  return <div className={className(styles.list_rate,isLast?'':styles.after_line)} onClick={()=>clickCallback?.(id)}>
    <div className={styles.list_rate_left}>
      <Progress width={40} type='circle' percent={rate} color={color}  formatText={(num: number) => num} />
    </div>
    <div className={styles.list_rate_right}>
      <h5 className={styles.list_task_name}>{name}</h5>
      <Progress type='line' percent={rate} color={color} className={styles.list_task_line_rate}></Progress>
    </div>
  </div>
}
export default memo(ListRate);