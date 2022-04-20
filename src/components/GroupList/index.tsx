import { memo } from 'react'
import { Card, Select } from '@arco-design/web-react'
import { ITaskGroup } from '@/types/task';
import ListRate from '../listrate/index'
interface IGroupListProps {
  taskGroup: ITaskGroup;
}
interface ISelectProps {
  handleSelect: (index: number) => void;
  options?: string[];
}

const Option = Select.Option;

const SelectTimer = ({ handleSelect, options }: ISelectProps) => {
  const optionsDefault = options || ['最近1小时', '最近3小时', '最近6小时', '最近12小时', '最近1天'];
  return <Select>
    {optionsDefault.map((option, id) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ))}
  </Select>
}
const GroupList = ({ taskGroup }: IGroupListProps) => {
  const { name, tasks } = taskGroup;
  // 处理选中ListRate
  return <Card title={<div style={{ textAlign: 'left' }}>{name}</div>} >
    {tasks.map((item) => <ListRate task={item} key={item.id} />)}
  </Card>;
}
export default memo(GroupList);