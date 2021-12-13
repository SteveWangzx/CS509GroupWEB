import { request } from '@/.umi/plugin-request/request';
import { history } from 'umi';
import React, { useEffect, useState, useRef } from 'react';
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
  Menu,
  Select,
  ConfigProvider,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import Field from '@ant-design/pro-field';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  info,
  TableListItem,
  ImplementationParams,
} from '@/services/TypeAlgorithm';
import { FetchImplementationList } from '@/services/TypeAlgorithm';
import enUSIntl from 'antd/lib/locale/en_US';
interface params {
  aid: string;
}

const intlMap = {
  enUSIntl,
};

export default function (params: params) {
  // const enUSIntl = createIntl('en_US', enLocale);
  const [intl, setIntl] = useState<string>('enUSIntl');
  // setting language for English

  const actionRef = useRef<ActionType>();
  // table auto refresh
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
  // const [tableSource, setTableSource] = useState<TableListItem[]>();
  const uid = localStorage.getItem('ams_uid');
  const { Option } = Select;
  const [value, setValue] = useState<string>('');
  const onChange = () => {
    setValue(value);
  };
  const { Title, Paragraph, Text, Link } = Typography;

  const handleImpOk = () => {
    setImpVisible(false);
    form_imp.resetFields();
  };

  const handleInsOk = () => {
    setInsVisible(false);
    form_ins.resetFields();
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
      // const fieldList = getTableList(res.data);
      setAlgoInfo(algorithmMap);
    });
  }, [aid]);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false));
  }, [refresh]);

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
          message.success('add success');
        })
        .then((res) => {
          handleImpOk();
          actionRef?.current?.reload();
        });
    });
  };

  const addProblemInstance = () => {
    form_ins.validateFields().then(() => {
      const data_form = form_ins.getFieldsValue();
      const { input, output, timeComplexityType } = data_form;
      const data = {
        aid: aid,
        input: input,
        output: output,
        uid: uid,
        timeComplexityType: timeComplexityType,
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

  const removeImplementation = (iid: string) => {
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
        message.success('remove success');
      })
      .then((res) => {
        actionRef?.current?.reload();
      })
      .catch((res) => {
        message.error('remove failed');
      });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Language',
      dataIndex: 'language',
      search: false,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      search: false,
    },
    {
      title: 'Upload Time',
      dataIndex: 'time',
      search: false,
    },
    {
      title: 'Operate',
      valueType: 'option',
      render: (text, row) => {
        return (
          <>
            <Button type="primary">View Code</Button>
            <Button>View Problem Instance</Button>
            <Button
              type="primary"
              onClick={() => {
                if (localStorage.getItem('ams_uname')) {
                  removeImplementation(row.iid);
                } else {
                  message.error('Please login to operate');
                }
              }}
            >
              Remove Implementation
            </Button>
          </>
        );
      },
    },
  ];

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
      <Title level={2}>Implementation</Title>
      {/* <Descriptions layout="vertical" column={1}>
        {text}
      </Descriptions> */}
      <ConfigProvider locale={intlMap.enUSIntl}>
        <ProTable<TableListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="Implementation"
          request={async (params, sort) => {
            const handleData: ImplementationParams = {
              aid: aid,
              uid: uid as string,
            };
            const { data } = await FetchImplementationList(handleData);
            return {
              data,
            };
          }}
          search={{
            optionRender: false,
            collapsed: false,
          }}
          toolBarRender={() => [
            <>
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
            </>,
          ]}
        ></ProTable>
      </ConfigProvider>
      <Space>
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
          <Form.Item name="input" label="input">
            <Input />
          </Form.Item>
          <Form.Item name="output" label="output">
            <Input />
          </Form.Item>
          <Form.Item name="timeComplexityType" label="timeComplexityType">
            <Select style={{ width: 300 }} onChange={onChange} value={value}>
              <Option value="0">0-worst case</Option>
              <Option value="1">1-best case</Option>
              <Option value="2">2-normal case</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
