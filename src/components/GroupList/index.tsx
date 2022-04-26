import { memo } from 'react'
import { Card } from '@arco-design/web-react'
import { ITaskGroup } from '@/types/task';
import ListRate from '../listrate/index'
import styles from './index.module.less'; 
import { ITask } from '@/store/task/type';
interface IGroupListProps {
  taskGroup: ITask;
}

const GroupList = ({ taskGroup }: IGroupListProps) => {
  const { name, taskId,data } = taskGroup;
  // 处理选中ListRate
  // return <Card title={<div style={{ textAlign: 'left' }} className={styles.group_name} >{name}</div>} bodyStyle={{ 'padding': '0px' }} >
  //   {data.map((item,index) => <ListRate task={item.} key={item.pingTime} isLast={index === tasks.length - 1} isActive={false}  clickCallback={(index)=>console.log(index)}/>)}
  // </Card>;
  return <div>1212</div>
}
export default memo(GroupList);