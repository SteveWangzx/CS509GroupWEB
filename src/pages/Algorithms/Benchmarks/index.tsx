import React, { useEffect, useRef } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  BenchmarksListItem,
  BenchmarksParams,
} from '@/services/TypeAlgorithm';
import { FetchBenchMarksList } from '@/services/TypeAlgorithm';
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
  const { pid, iid, uid } = params;
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    console.log(params);
  });

  const columns: ProColumns<BenchmarksListItem>[] = [
    {
      title: 'Benchmarks Name',
      dataIndex: 'name',
      search: false,
    },
    {
      title: 'Chip',
      dataIndex: 'chip',
      search: false,
    },
    {
      title: 'Core',
      dataIndex: 'core',
      search: false,
    },
    {
      title: 'Threads',
      dataIndex: 'threads',
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
            <Button type="link">Remove BenchMarks</Button>
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
          toolBarRender={() => [
            <>
              <Button type="primary" onClick={() => {}}>
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
    </>
  );
}
