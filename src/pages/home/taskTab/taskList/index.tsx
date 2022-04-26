import { ITask } from '@/store/task/type';
import { IconEmpty } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import ListRate from '@/components/listrate/index'
interface IProps {
  taskGroup: ITask[];
  name: string,
  changeTask: (id: string) => void,
  activeTaskId: string,
}
const TaskList = ({ taskGroup, name, changeTask, activeTaskId }: IProps) => {

  return <div className={styles.task_list}>
    <div className={styles.task_list_header}>
      <input
        className={styles.task_list_input}
        placeholder='搜索...'
      />
    </div>
    <div className={styles.task_list_body}>
      {
        taskGroup.length > 0 ?
          taskGroup.map(item => <ListRate
            task={item} key={item.taskId}
            isActive={item.taskId === activeTaskId}
            isLast={false}
            clickCallback={(id) => changeTask(id)}
          />) :
          <div style={{ height: '200px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <IconEmpty style={{ 'display': 'flex', width: '32px', height: '32px' }} />
            <div>NO data</div>
          </div>
      }
    </div>
  </div>
}
export default TaskList;