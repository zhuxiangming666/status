import { memo } from "react";
import styles from './index.module.less';

interface IProps {
  principal: string,
  failureRule: string,
  time: string,
}
const ServiceNameplate =  ({principal,failureRule,time}: IProps) => {
  return <div className={styles.nameplate}>
    <h2>服务铭牌</h2>
    <div className={styles.nameplate_table}>
      <div className={styles.nameplate_table_principal}>
        <h3>负责人</h3>
        <div>{principal}</div>
      </div>
      <div className={styles.nameplate_table_failureRule}>
        <h3>故障规则</h3>
        <div>{failureRule}</div>
      </div>
      <div className={styles.nameplate_table_time}>
        <h3>创建时间</h3>
        <div>{time}</div>
      </div>
    </div>
  </div>
}
export default memo(ServiceNameplate);