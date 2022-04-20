import { memo } from 'react'

import { IStatus, ITask } from "@/types/task"
import { Progress } from "@arco-design/web-react"
import styles from './index.module.less';

const ListRate = ({ task }: { task: ITask }) => {
  const { rate, name, status } = task;
  const color = status === IStatus.SUCCESS ? '#F53F3F' : '#00B42A'
  return <div className={styles.list_rate}>
    <Progress width={40} type='circle' percent={rate} color={color} className={styles.list_rate_left} formatText={(num: number) => num} />
    <div className={styles.list_rate_right}>
      <h5 className={styles.list_task_name}>{name}</h5>
      <Progress type='line' percent={rate}></Progress>
    </div>
  </div>
}
export default memo(ListRate);