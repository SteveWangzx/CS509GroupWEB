import React, { useEffect, useRef, useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input, message } from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  BenchmarksListItem,
  BenchmarksParams,
} from '@/services/TypeAlgorithm';
import { FetchBenchMarksList } from '@/services/TypeAlgorithm';
import { request } from '@/.umi/plugin-request/request';
import enUSIntl from 'antd/lib/locale/en_US';

interface benchParams {
  pid: string;
  iid: string;
  uid: string;
}
const intlMap = {
  enUSIntl,
};
export default function (params: benchParams) {
  const [addBenchVisible, setAddBenchVisible] = useState<boolean>(false);
  const { pid, iid, uid } = params;
  const actionRef = useRef<ActionType>();
  const [form_Bench] = Form.useForm();

  const handlAddBenchClick = () => {
    setAddBenchVisible(true);
  };

  const handleAddBenchCancel = () => {
    setAddBenchVisible(false);
  };

  const addBenchmark = () => {
    form_Bench.validateFields().then(() => {
      const data_form = form_Bench.getFieldsValue();
      const { name, time, l1cache, l2cache, chip, core, thread } = data_form;
      const data = {
        iid: iid,
        pid: pid,
        time: time,
        name: name,
        l1cache: l1cache,
        l2cache: l2cache,
        chip: chip,
        core: core,
        thread: thread,
        uid: uid,
      };
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Benchmark/add',
        {
          method: 'POST',
          data,
        },
      )
        .then((res) => {
          message.success('success');
        })
        .then((res) => {
          actionRef?.current?.reload();
          setAddBenchVisible(false);
          form_Bench.resetFields();
        })
        .catch((res) => {
          message.error('failed');
        });
    });
  };

  const removeBenchmark = (bid: string) => {
    const data = {
      bid: bid,
      uid: uid,
    };
    request(
      'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha//classification/Benchmark/remove',
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

  useEffect(() => {
    console.log(params);
  });

  const columns: ProColumns<BenchmarksListItem>[] = [
    {
      title: 'Benchmarks Name',
      dataIndex: 'name',
      search: false,
      width: 150,
    },
    {
      title: 'Chip',
      dataIndex: 'chip',
      search: false,
      width: 150,
    },
    {
      title: 'Core',
      dataIndex: 'core',
      search: false,
    },
    {
      title: 'Threads',
      dataIndex: 'thread',
      search: false,
    },
    {
      title: 'Level 1 Cache',
      dataIndex: 'l1cache',
      search: false,
    },
    {
      title: 'Level 2 Cache',
      dataIndex: 'l2cache',
      search: false,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      search: false,
    },
    {
      title: 'Operate',
      valueType: 'option',
      render: (text, row) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                if (localStorage.getItem('ams_uname')) {
                  removeBenchmark(row.bid);
                } else {
                  message.error('Please login to operate');
                }
              }}
            >
              Remove Benchmark
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ConfigProvider locale={intlMap.enUSIntl}>
        <ProTable<BenchmarksListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="Benchmarks"
          search={{
            optionRender: false,
            collapsed: false,
          }}
          pagination={{
            pageSize: 5,
          }}
          toolBarRender={() => [
            <>
              <Button
                type="primary"
                onClick={() => {
                  if (localStorage.getItem('ams_uname')) {
                    handlAddBenchClick();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Add Benchmark
              </Button>
            </>,
          ]}
          request={async (params, sort) => {
            const handleData: benchParams = {
              pid: pid,
              iid: iid,
              uid: uid,
            };
            const { data } = await FetchBenchMarksList(handleData);
            return {
              data,
            };
          }}
        ></ProTable>
      </ConfigProvider>
      <Modal
        title="Add Benchmark"
        visible={addBenchVisible}
        footer={[
          <Button type="primary" onClick={() => handleAddBenchCancel()}>
            Cancel
          </Button>,
          <Button type="primary" onClick={() => addBenchmark()}>
            Submit
          </Button>,
        ]}
        onCancel={handleAddBenchCancel}
      >
        <Form form={form_Bench}>
          <Form.Item name="name" label="Benchmarks name">
            <Input />
          </Form.Item>
          <Form.Item name="chip" label="Chip">
            <Input />
          </Form.Item>
          <Form.Item name="core" label="Core">
            <Input />
          </Form.Item>
          <Form.Item name="thread" label="Threads">
            <Input />
          </Form.Item>
          <Form.Item name="l1cache" label="Level 1 Cache(G)">
            <Input />
          </Form.Item>
          <Form.Item name="l2cache" label="Level 2 Cache(G)">
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Time">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
