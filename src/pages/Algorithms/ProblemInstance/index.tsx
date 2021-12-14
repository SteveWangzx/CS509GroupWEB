import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  ProblemListItem,
  ImplementationParams,
} from '@/services/TypeAlgorithm';

interface aid {
  aid: string;
}
export default function (params: aid) {
  const { aid } = params;

  useEffect(() => {
    console.log(aid);
  }, [aid]);

  const columns: ProColumns<ProblemListItem>[] = [
    {
      title: 'Input',
      dataIndex: 'input',
      search: false,
    },
    {
      title: 'Output',
      dataIndex: 'output',
      search: false,
    },
    {
      title: '',
    },
  ];

  return <div></div>;
}
