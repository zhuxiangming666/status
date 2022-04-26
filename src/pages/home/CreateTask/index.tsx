import { memo, useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, InputNumber } from '@arco-design/web-react';
import { createTask as apiCreateTask } from '@/api';
import { useDispatch } from 'react-redux';

import { createTask } from '@/store/task/action'
import { ITask } from '@/store/task/type';
const FormItem = Form.Item;
interface IProps {
  setVisible: (bool: boolean) => void;
}
function CreateTask({ setVisible }: IProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  function onOk() {
    form.validate().then((res) => {
      apiCreateTask({
        ...res,
        'heartbeat_time': res.heartbeat_time.toString()
      }).then(result => {
        dispatch(createTask({ taskId: result.callID, rate: 100, data: [], name: res.name } as ITask));
        setVisible(false);
        void Message.success('创建任务成功',);
      }).catch(err => {
        void Message.error('创建任务失败')
      });
    }).catch(err => {
      console.log('[BUTTERFLY][07:41:21]', err);
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <Modal
      title='添加监测任务'
      onOk={onOk}
      onCancel={() => setVisible(false)}
      visible={true}
    >
      <Form
        {...formItemLayout}
        form={form}
        labelCol={{ style: { flexBasis: 90 } }}
        wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
      >
        <FormItem label='种类' field='kind' rules={[{ required: true }]}>
          <Input placeholder='' />
        </FormItem>
        <FormItem label='心跳' required field='heartbeat_time' rules={[{ required: true }]}>
          <InputNumber placeholder='请输入心跳的时间(s)' min={15} />
        </FormItem>
        <FormItem label='名称' required field='name' rules={[{ required: true }]}>
          <Input placeholder='' />
        </FormItem>
        <FormItem label='地址' required field='ip' rules={[{ required: true }]}>
          <Input placeholder='' />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default memo(CreateTask);