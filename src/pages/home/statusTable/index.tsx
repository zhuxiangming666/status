import { memo } from "react";
import { Table } from '@arco-design/web-react';
import styles from './index.module.less'

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

export interface IMessage {
  status: string;
  time: string;
  message: string;
}

interface IProps {
  data: IMessage[]
}

const StatusTable = ({ data }: IProps) => {
  return <div className={styles.status_table}>
    <div className={styles.status_table_header}>
    </div>
    <Table
      style={{ height: '300px' }}
      columns={columns}
      data={data}
      virtualized={true}
      pagination={false}
    />
  </div>
};
export default memo(StatusTable);
