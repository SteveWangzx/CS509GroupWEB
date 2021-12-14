import React, { useEffect, useState, useRef } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type {
  ProblemListItem,
  ImplementationParams,
} from '@/services/TypeAlgorithm';
import { FetchProblemList } from '@/services/TypeAlgorithm';
import enUSIntl from 'antd/lib/locale/en_US';
import Benchmarks from '@/pages/Algorithms/Benchmarks';

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
  const { aid, iid } = params;
  const actionRef = useRef<ActionType>();
  const [benchmarkVisible, setBenchmarkVisible] = useState<boolean>(false);
  const uid = localStorage.getItem('ams_uid');
  const pid_params = useRef<string>('');

  const handleBenchmarkClick = () => {
    setBenchmarkVisible(true);
  };

  const handleBenchMarksCancel = () => {
    setBenchmarkVisible(false);
  };

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
            <Button
              type="link"
              onClick={() => {
                pid_params.current = text.pid;
                handleBenchmarkClick();
              }}
            >
              View Benchmarks
            </Button>
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
              <Button type="primary" onClick={() => {}}>
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
        <Modal
          visible={benchmarkVisible}
          title="Benchmarks"
          footer={false}
          onCancel={handleBenchMarksCancel}
        >
          <Benchmarks uid={uid as string} pid={pid_params.current} iid={iid} />
        </Modal>
      </ConfigProvider>
    </>
  );
}
