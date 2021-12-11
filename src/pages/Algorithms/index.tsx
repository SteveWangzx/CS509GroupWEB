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
  Space,
  Rate,
  Card,
  Col,
  Row,
} from 'antd';
import ProCard from '@ant-design/pro-card';
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
  const [form_imp] = Form.useForm();
  const [form_ins] = Form.useForm();
  const [form_removeimp] = Form.useForm();
  const [addImpVisible, setImpVisible] = useState<boolean>(false);
  const [addInsVisible, setInsVisible] = useState<boolean>(false);
  const [removeImpVisible, setRemoveImpVisible] = useState<boolean>(false);
  const [text, setText] = useState<any>();
  const [algoInfo, setAlgoInfo] = useState<info>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const uid = localStorage.getItem('ams_uid');

  const { Title, Paragraph, Text, Link } = Typography;

  const handleImpOk = () => {
    setImpVisible(false);
    form_imp.resetFields();
  };

  const handleInsOk = () => {
    setInsVisible(false);
    form_ins.resetFields();
  };

  const handleRemoveImpOk = () => {
    setRemoveImpVisible(false);
    form_removeimp.resetFields();
  };

  const handleImpCancel = () => {
    setImpVisible(false);
    form_imp.resetFields();
  };

  const handleInsCancel = () => {
    setInsVisible(false);
    form_ins.resetFields();
  };

  const handleRemoveImpCancel = () => {
    setRemoveImpVisible(false);
    form_removeimp.resetFields();
  };

  const handleImpClick = () => {
    setImpVisible(true);
    form_imp.resetFields();
  };

  const handleInsClick = () => {
    setInsVisible(true);
    form_ins.resetFields();
  };

  const handleRemoveImpClick = () => {
    setRemoveImpVisible(true);
    form_removeimp.resetFields();
  };

  const getAlgorithm = async () => {
    const res = await request(
      'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm',
      {
        method: 'POST',
        data: {
          aid: aid,
          uid: uid,
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
    form_imp.validateFields().then(() => {
      const data_form = form_imp.getFieldsValue();
      const { language, code } = data_form;
      const data = {
        aid: aid,
        language: language,
        code: code,
        uid: uid,
      };
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Implementation/add',
        {
          method: 'POST',
          data,
        },
      )
        .then((res) => {
          message.success('success');
        })
        .then((res) => {
          handleImpOk();
          history.push('/');
        });
    });
  };

  const addProblemInstance = () => {
    form_ins.validateFields().then(() => {
      const data_form = form_ins.getFieldsValue();
      const { instance, type } = data_form;
      const data = {
        aid: aid,
        instance: instance,
        type: type,
        uid: uid,
      };
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/ProblemInstance/add',
        {
          method: 'POST',
          data,
        },
      )
        .then((res) => {
          message.success('success');
        })
        .then((res) => {
          handleInsOk();
          history.push('/');
        });
    });
  };

  const removeImplementation = () => {
    form_removeimp.validateFields().then(() => {
      const data_form = form_removeimp.getFieldsValue();
      const { iid } = data_form;
      const data = {
        iid: iid,
        uid: uid,
      };
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Implementation/remove',
        {
          method: 'POST',
          data,
        },
      )
        .then((res) => {
          message.success('success');
        })
        .then((res) => {
          handleRemoveImpOk();
          history.push('/');
        });
    });
  };

  return (
    <div>
      <Title>{algoInfo?.name}</Title>
      <Rate />
      <Title level={2}>Introduction</Title>
      {/* <ProCard title="Introduction" extra="extra" tooltip="Introduction" style={{ maxWidth: 1100 }} headerBordered>
        {algoInfo?.introduction}
      </ProCard> */}
      <Paragraph>{algoInfo?.introduction}</Paragraph>
      <Title level={2}>Content</Title>
      <Paragraph>{algoInfo?.content}</Paragraph>
      <Title level={2}>Algorithm Complexity</Title>
      {/* <Paragraph>
        Time complexity:{algoInfo?.timecplx}
        <br />
        Space complexity:{algoInfo?.spacecplx}
      </Paragraph> */}
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={5}>
            <Card title="Time Complexity" bordered={false}>
              {algoInfo?.timecplx}
            </Card>
          </Col>
          <Col span={5}>
            <Card title="Space Complexity" bordered={false}>
              {algoInfo?.spacecplx}
            </Card>
          </Col>
        </Row>
      </div>
      ,<Title level={2}>Implementation</Title>
      <Descriptions layout="vertical" column={1}>
        {text}
      </Descriptions>
      <Title level={2}>Problem Instance</Title>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            if (localStorage.getItem('ams_uname')) {
              handleImpClick();
            } else {
              message.error('Please login to operate');
            }
          }}
        >
          Add Implementation
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (localStorage.getItem('ams_uname')) {
              handleInsClick();
            } else {
              message.error('Please login to operate');
            }
          }}
        >
          Add Problem Instance
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (localStorage.getItem('ams_uname')) {
              handleRemoveImpClick();
            } else {
              message.error('Please login to operate');
            }
          }}
        >
          Remove Implementation
        </Button>
      </Space>
      <Modal
        title="Add Implementation"
        visible={addImpVisible}
        footer={[
          <Button type="primary" onClick={() => handleImpCancel()}>
            Cancel
          </Button>,
          <Button type="primary" onClick={() => addImplementation()}>
            Submit
          </Button>,
        ]}
        onCancel={handleImpCancel}
      >
        <Form form={form_imp}>
          <Form.Item name="language" label="language">
            <Input />
          </Form.Item>
          <Form.Item name="code" label="implementation">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Problem Instance"
        visible={addInsVisible}
        footer={[
          <Button type="primary" onClick={() => handleInsCancel()}>
            Cancel
          </Button>,
          <Button type="primary" onClick={() => addProblemInstance()}>
            Submit
          </Button>,
        ]}
        onCancel={handleInsCancel}
      >
        <Form form={form_ins}>
          <Form.Item name="instance" label="problem instance">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="type" label="type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Remove Implementation"
        visible={removeImpVisible}
        footer={[
          <Button type="primary" onClick={() => handleRemoveImpCancel()}>
            Cancel
          </Button>,
          <Button type="primary" onClick={() => removeImplementation()}>
            Remove
          </Button>,
        ]}
        onCancel={handleRemoveImpCancel}
      >
        <Form form={form_removeimp}>
          <Form.Item name="iid" label="implementation">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
