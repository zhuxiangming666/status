import { memo } from 'react'
import { Card } from '@arco-design/web-react'
import { IconEmpty } from '@arco-design/web-react/icon'
import ListRate from '../listrate/index'
import styles from './index.module.less';
import { ITask } from '@/store/task/type';
interface IGroupListProps {
  taskGroup: ITask[];
  name: string,
  changeTask: (id: string) => void,
  activeTaskId: string,
  groupId?: string
}

const GroupList = ({ taskGroup, name, groupId, changeTask, activeTaskId }: IGroupListProps) => {

  return <Card title={<div
    style={{ textAlign: 'left' }}
    className={styles.group_name} >{name}</div>}
    bodyStyle={{ 'padding': '0px', height: '100%' }} >
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
  </Card >;
}
export default memo(GroupList);