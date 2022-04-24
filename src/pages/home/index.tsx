import { memo } from 'react';
import { Alert, Select,Message } from '@arco-design/web-react';

import GroupList from '@/components/GroupList';
import { IStatus } from '@/types/task';
import CardDetail from './cardDetails'
import styles from './index.module.less';
import ServiceNameplate from './serviceNameplate';
import LastStatus from './lastStatus';
import StatusTable from './statusTable';
import Example from './statusCharts';
const Option = Select.Option;
// import AlertMessage from '@/components/AlertMessage'


interface IServeDetail {
  title: string,
  desc: string,
  data: string,
}
const ServeArray = [{
  title: '响应',
  desc: '(当前)',
  data: '816 ms',
},{
  title: '平均响应',
  desc: '24小时',
  data: '899 ms',
},{
  title: '在线时间',
  desc: '24小时',
  data: '100%',
},{
  title: '在线时间',
  desc: '(30天)',
  data: '99.36%',
},{
  title: '证书有效期',
  desc: '(2023-03-16)',
  data: '330 天',
}]
const Home = () => {
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

  // 服务铭牌 数据
  const server_data = {   
    principal: '杨进豪',
    failureRule: '连续1000次检查失败',
    time: '2020-05-15'
  };
  return (<div className={styles.home}>
    <div className={styles.home_left}>
      <div className={styles.home_left_header}> 这里缺一个logo</div>
      <div className={styles.home_left_detail}>
        <h1 className={styles.home_left_name }>页面名称(用户指定)</h1>
        <h1 className={styles.home_left_desc }>描述信息(用户指定)</h1>
      </div>
      <Alert content={<h5>所有服务运行正常</h5>} type={'success'} style={{ height: '54px',borderRadius: '20px',fontSize: '20px',marginBottom: '10px' }}></Alert>
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
      {
        groupTasks.map(item => <GroupList taskGroup={item} key={item.id}/>)
      }
    </div>
    <div className={styles.home_right}>
      {/* 服务铭牌 */}
      <ServiceNameplate {...server_data}/>
      {/* 描述信息 */}
      <div className={styles.home_right_bottom}>
      <LastStatus taskStatus={[IStatus.SUCCESS]} />
      <div className={styles.serve_detail}>
        {
          ServeArray.map(item=><CardDetail {...item} key={`${item.desc}${item.title}`}/>)
        }</div>
      </div>
      
      <StatusTable />
      <Example />
    </div>
  </div>)
};
export default memo(Home);