import { memo } from "react";
import { Table } from '@arco-design/web-react';
import styles from './index.module.less'
import { IStatus } from "@/types/task";

const columns = [
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '时间日期',
    dataIndex: 'time',
  },
  {
    title: '消息',
    dataIndex: 'message',
  }
];

const data = [
  {
    status: IStatus.SUCCESS,
    time: '2002-12-08 14:09:08',
    message: '200 - ok'
  },{
    status: IStatus.ERROR,
    time: '2002-12-08 14:09:08',
    message: '200 - ok'
  },{
    status: IStatus.SUCCESS,
    time: '2002-12-08 14:09:08',
    message: 'error'
  }
];

const StatusTable = () =>{
  return <Table 
          columns={columns} 
          data={data} 
          virtualized={true} 
          pagination={false}
        />
};
export default memo(StatusTable);
