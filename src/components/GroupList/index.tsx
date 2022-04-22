import { memo } from 'react'
import { Card } from '@arco-design/web-react'
import { ITaskGroup } from '@/types/task';
import ListRate from '../listrate/index'
import styles from './index.module.less'; 
interface IGroupListProps {
  taskGroup: ITaskGroup;
}


const GroupList = ({ taskGroup }: IGroupListProps) => {
  const { name, tasks } = taskGroup;
  // 处理选中ListRate
  return <Card title={<div style={{ textAlign: 'left' }} className={styles.group_name} >{name}</div>} bodyStyle={{ 'padding': '0px' }} >
    {tasks.map((item,index) => <ListRate task={item} key={item.id} isLast={index === tasks.length - 1} isActive={false}  clickCallback={(index)=>console.log(index)}/>)}
  </Card>;
}
export default memo(GroupList);