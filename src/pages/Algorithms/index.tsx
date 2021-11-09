import { request } from '@/.umi/plugin-request/request';
import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  message,
  Typography,
  Descriptions,
} from 'antd';
import Field from '@ant-design/pro-field';
interface params {
  aid: string;
}

interface info {
  name: string;
  introduction: string;
  content: string;
  timecplx: string;
  spacecplx: string;
}

export default function (params: params) {
  const { aid } = params;
  const [form] = Form.useForm();
  const [Visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<any>();
  const [algoInfo, setAlgoInfo] = useState<info>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const { Title, Paragraph, Text, Link } = Typography;

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
  };

  const getAlgorithm = async () => {
    const res = await request(
      'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm',
      {
        method: 'POST',
        data: {
          aid: aid,
        },
      },
    );
    return res;
  };

  useEffect(() => {
    getAlgorithm().then((res) => {
      const { algorithmMap } = res.data;
      const fieldList = getField(res.data);
      setAlgoInfo(algorithmMap);
      setText(fieldList);
    });
  }, [aid]);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false));
  }, [refresh]);

  const getField = (data: any) => {
    const { implementationList } = data;
    return Object.values(implementationList).map((item: any, index: any) => {
      return (
        <Descriptions.Item label={item.language}>
          <Field mode="read" valueType="code" text={item.code} />
        </Descriptions.Item>
      );
    });
  };

  const addImplementation = () => {
    form.validateFields().then(() => {
      const data_form = form.getFieldsValue();
      const { language, code } = data_form;
      const data = {
        aid: aid,
        language: language,
        code: code,
      };
      request(
        'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/Implementation/add',
        {
          method: 'POST',
          data,
        },
      )
        .then((res) => {
          message.success('success');
        })
        .then((res) => {
          handleOk();
          history.push('/');
        });
    });
  };

  return (
    <div>
      <Title>{algoInfo?.name}</Title>
      <Title level={2}>INTRODUCTION</Title>
      <Paragraph>{algoInfo?.introduction}</Paragraph>
      <Title level={2}>CONTENT</Title>
      <Paragraph>{algoInfo?.content}</Paragraph>
      <Title level={2}>Algorithm Complexity</Title>
      <Paragraph>
        Time complexity:{algoInfo?.timecplx}
        <br />
        Space complexity:{algoInfo?.spacecplx}
      </Paragraph>
      <Descriptions title="Implementations" layout="vertical" column={1}>
        {text}
      </Descriptions>
      <Button
        type="primary"
        onClick={() => {
          if (localStorage.getItem('ams_uname')) {
            handleClick();
          } else {
            message.error('Please login to operate');
          }
        }}
      >
        add Implementation
      </Button>
      <Modal
        title="Add Implementation"
        visible={Visible}
        footer={[
          <Button type="primary" onClick={() => handleCancel()}>
            Cancel
          </Button>,
          <Button type="primary" onClick={() => addImplementation()}>
            Submit
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="language" label="language">
            <Input />
          </Form.Item>
          <Form.Item name="code" label="implementation">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
