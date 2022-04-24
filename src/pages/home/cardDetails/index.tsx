import { memo } from "react";
import classNames from 'classnames'
import styles from './index.module.less';
interface IProps{
  title: string,
  desc: string,
  data: string,
  click?: ()=>void
}

const CardDetail = ({title,desc,data,click}: IProps) =>{
  return <div className={styles.card_details}>
    <h4 className={styles.card_details_title}>{title}</h4>
    <div className={styles.card_details_desc}>{desc}</div>
    <h6 className={classNames(styles.card_detail_data,click?styles.can_click:'')} onClick={()=>click?.()}>{data}</h6>
  </div>
}
export default memo(CardDetail);