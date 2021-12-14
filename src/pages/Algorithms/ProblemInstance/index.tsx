import React, { useEffect, useState, useRef } from 'react';
import { Button, ConfigProvider } from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  ProblemListItem,
  ImplementationParams,
} from '@/services/TypeAlgorithm';
import { FetchProblemList } from '@/services/TypeAlgorithm';
import enUSIntl from 'antd/lib/locale/en_US';

interface aid {
  aid: string;
  iid: string;
}
const intlMap = {
  enUSIntl,
};

export default function (params: aid) {
  const { aid } = params;
  const actionRef = useRef<ActionType>();
  const uid = localStorage.getItem('ams_uid');

  useEffect(() => {
    console.log(aid);
    actionRef?.current?.reload();
  }, [aid]);

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
    },
    {
      title: 'Operate',
      valueType: 'option',
      render: (row, text) => {
        return (
          <>
            <Button type="link">View Benchmarks</Button>
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
    </>
  );
}
