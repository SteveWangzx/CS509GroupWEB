import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  message,
  Input,
  Select,
} from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  ProblemListItem,
  ImplementationParams,
} from '@/services/TypeAlgorithm';
import { FetchProblemList } from '@/services/TypeAlgorithm';
import enUSIntl from 'antd/lib/locale/en_US';
import { request } from '@/.umi/plugin-request/request';
import { history } from 'umi';

interface aid {
  aid: string;
  iid: string;
}
const intlMap = {
  enUSIntl,
};

const type: { [key: string]: string } = {
  '0': 'Worst Case',
  '1': 'Best Case',
  '2': 'Normal Case',
};

export default function (params: aid) {
  const [form_ins] = Form.useForm();
  const [addInsVisible, setInsVisible] = useState<boolean>(false);
  const { aid } = params;
  const actionRef = useRef<ActionType>();
  const uid = localStorage.getItem('ams_uid');
  const { Option } = Select;
  const [value, setValue] = useState<string>('');
  const onChange = () => {
    setValue(value);
  };

  useEffect(() => {
    console.log(aid);
    actionRef?.current?.reload();
  }, [aid]);

  const handleInsClick = () => {
    setInsVisible(true);
    form_ins.resetFields();
  };

  const handleInsOk = () => {
    setInsVisible(false);
    form_ins.resetFields();
  };

  const handleInsCancel = () => {
    setInsVisible(false);
    form_ins.resetFields();
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

  const columns: ProColumns<ProblemListItem>[] = [
    {
      title: 'Input',
      dataIndex: 'input',
      search: false,
      width: 50,
    },
    {
      title: 'Output',
      dataIndex: 'output',
      search: false,
      width: 50,
    },
    {
      title: 'TimeComplexityType',
      dataIndex: 'timecomplexitytype',
      search: false,
      width: 50,
      render: (row, text) => {
        return <div>{type[text.timecomplexitytype]}</div>;
      },
    },
    {
      title: 'Operate',
      valueType: 'option',
      render: (row, text) => {
        return (
          <>
            <Button type="link">View Benchmarks</Button>
            <Button type="primary">Remove Problem Instance</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ConfigProvider locale={intlMap.enUSIntl}>
        <ProTable<ProblemListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="Problem Instances"
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
                    handleInsClick();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Add Problem Instance
              </Button>
            </>,
          ]}
          request={async (params, sort) => {
            const handleData: ImplementationParams = {
              aid: aid,
              uid: uid as string,
            };
            const { data } = await FetchProblemList(handleData);
            console.log(data);
            return {
              data,
            };
          }}
        ></ProTable>
      </ConfigProvider>
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
    </>
  );
}
