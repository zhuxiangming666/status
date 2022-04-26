import GroupList from '@/components/GroupList';
import ListRate from '@/components/listrate';
import { setActiveId } from '@/store/task/action';
import { ITask } from '@/store/task/type';
import { IStoreState } from '@/store/type'
import { IStatus } from '@/types/task';
import { Alert, Button, Message, Select, Tabs, Typography } from '@arco-design/web-react';
import { memo, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateTask from '../CreateTask';
import styles from './index.module.less';
import TaskList from './taskList';
const TabPane = Tabs.TabPane;

const style = { textAlign: 'center', marginTop: 20 } as React.CSSProperties;
interface IServeDetail {
  title: string,
  desc: string,
  data: string,
}



const groupTasks = [{
  id: '1',
  name: '123',
  tasks: [{
    id: '1-1',
    name: '1-1',
    rate: 90,
    status: IStatus.SUCCESS,
  }, {
    id: '1-2',
    name: '1-2',
    rate: 80,
    status: IStatus.ERROR,
  }]
}];
const options = ['最近1小时', '最近3小时', '最近6小时', '最近12小时', '最近1天'];

const Option = Select.Option;
const TaskTab = () => {
  const [isAddTask, setIsAddTask] = useState(false);
  const tasks = useSelector<IStoreState, Map<string, ITask> | null>(state => state.tasks.tasks);
  const activeId = useSelector<IStoreState, string>(state => state.tasks.activeId);

  const dispatch = useDispatch();

  const showTasks = useMemo(() => {
    if (!tasks) return [] as ITask[];
    return Array.from(tasks.values());
  }, [tasks]);

  // 切换选中任务
  const changeTask = useCallback((id: string) => {
    dispatch(setActiveId(id))
  }, [dispatch]);

  return <>
    <Tabs defaultActiveTab='1' >
      <TabPane key='1' title='task' >
        {/* 任务list */}
        <div className={styles.add_list_button}><Button shape='round' status='success' onClick={() => setIsAddTask(true)}>添加监控</Button></div>
        <div id={`ming`} className={styles.task_list} style={{ height: 'calc(100vh - 200px)' }}>
          <TaskList
            activeTaskId={activeId}
            changeTask={changeTask}
            name={`任务列表`}
            taskGroup={showTasks}
          />
        </div>
      </TabPane>
      <TabPane key='2' title='group'>

        <div className={styles.home_left_detail}>
          <h1 className={styles.home_left_name}>页面名称(用户指定)</h1>
          <h1 className={styles.home_left_desc}>描述信息(用户指定)</h1>
        </div>

        <Alert content={<h5>所有服务运行正常</h5>} type={'success'} style={{ height: '54px', borderRadius: '20px', fontSize: '20px', marginBottom: '10px' }}></Alert>

        <Select
          style={{ width: 154 }}
          defaultValue={options[0]}
          onChange={(value) => Message.info({ content: `You select ${value}.`, showIcon: true })}
        >
          {options.map((option, index) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        {/* {
          groupTasks.map(item => <GroupList taskGroup={item} key={item.id} />)
        } */}
      </TabPane>
    </Tabs >
    {/* 添加任务模态框 */}
    {
      isAddTask && <CreateTask setVisible={setIsAddTask} />
    }
  </>
}
export default memo(TaskTab);
