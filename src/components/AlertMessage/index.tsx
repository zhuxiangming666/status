import { IStatus } from "@/types/task";
import { Alert } from "@arco-design/web-react";
import { useMemo } from "react";
import { memo } from "react";

interface IProps {
  text?: string,
  status: IStatus,
}
type status  = 'success'| 'error';

const AlertMessage =({text,status}: IProps)=>{
  const { textDesc, type } = useMemo(()=>{
    switch (status) {
      case IStatus.SUCCESS:
        return {textDesc: text?text:'所有服务运行正常',type: 'success'};
      default:
        return {textDesc: text?text:'有错误',type: 'error' };
    }
  },[text, status]);
  return <Alert type={type as status} content={textDesc}/>
};
export default memo(AlertMessage);