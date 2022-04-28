import { ITask } from '@/store/task/type';
import { IconEmpty } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import ListRate from '@/components/listrate/index'
import { useMemo, useState } from 'react';
import { debounce } from '@/utils/utils';
import { Button, Message, Modal } from '@arco-design/web-react';
import { useCallback } from 'react';
import { deleteTask as deleteTaskApi } from '@/api'
import { useDispatch } from 'react-redux';
import { removeTask } from '@/store/task/action';
interface IProps {
  taskGroup: ITask[];
  name: string,
  changeTask: (id: string) => void,
  activeTaskId: string,
}
const TaskList = ({ taskGroup, name, changeTask, activeTaskId }: IProps) => {

  const [filter,setFilter] = useState('');
  const[isShowDelete,setIsShowDelete] = useState(false);
  const dispatch = useDispatch();

  const showTaskGroup = useMemo(() => {
    return taskGroup.filter(item=>item.name.includes(filter));
  },[taskGroup,filter]);

  // deleteTask
  const deleteTask = useCallback(async ()=>{
    if(!activeTaskId) Message.info('请选中你要删除的任务');
    try {
      const data = await deleteTaskApi(activeTaskId);
      dispatch(removeTask(activeTaskId));
      setIsShowDelete(false);
      Message.success('删除成功');
    } catch (error) {
      Message.warning('删除失败');
    }

  },[activeTaskId,dispatch]);


  return <>
    <div className={styles.task_list}>
    <div className={styles.task_list_header}>
      <Button type='primary' shape='round' status='danger' onClick={()=>{
        console.log('[BUTTERFLY][08:45:07]', 123123);
        setIsShowDelete(true)
      }}>
        删除
      </Button>
      <input
        className={styles.task_list_input}
        placeholder='搜索...'
        onChange={(e)=>debounce(setFilter,100)(e.target.value)}
      />
    </div>
    <div className={styles.task_list_body}>
      {
        showTaskGroup.length > 0 ?
        showTaskGroup.map(item => <ListRate
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
  
  {/* 删除任务 */}
  {
    <Modal
    title='删除 监控'
    visible={isShowDelete}
    onOk={() => deleteTask()}
    onCancel={() => setIsShowDelete(false)}
    autoFocus={false}
    focusLock={true}
  >
    <p>
      你确定要删除当前监控吗
    </p>
  </Modal>
  }
  </> 
}
export default TaskList;