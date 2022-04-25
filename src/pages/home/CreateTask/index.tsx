import { memo, useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, InputNumber } from '@arco-design/web-react';
import { createTask } from '@/api';

const FormItem = Form.Item;
interface IProps {
  setVisible: (bool: boolean) => void;
}
function CreateTask({ setVisible }: IProps) {
  const [form] = Form.useForm();
  function onOk() {
    form.validate().then((res) => {
      // console.log(res);
      createTask({ ...res, 'heartbeat_time': res.heartbeat_time.toString() });
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