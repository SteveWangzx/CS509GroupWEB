import React, { useEffect, useRef, useState } from 'react';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import enUSIntl from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';

import {
  userActivity,
  UAParmas,
  registerUsers,
  fetchUA,
} from '@/services/TypeUser';
interface Params {
  quid: string;
}

const intlMap = {
  enUSIntl,
};
export default function (Params: Params) {
  const { quid } = Params;
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<userActivity>[] = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      search: false,
    },
    {
      title: 'time',
      dataIndex: 'time',
      search: false,
    },
  ];

  useEffect(() => {
    console.log(quid);
    actionRef?.current?.reload();
  }, [quid]);

  return (
    <>
      <ConfigProvider locale={intlMap.enUSIntl}>
        <ProTable<userActivity>
          columns={columns}
          actionRef={actionRef}
          search={{
            optionRender: false,
            collapsed: false,
          }}
          pagination={{
            pageSize: 5,
          }}
          request={async (params, sort) => {
            const handleData: UAParmas = {
              quid: quid,
            };
            const { data } = await fetchUA(handleData);
            return {
              data,
            };
          }}
        ></ProTable>
      </ConfigProvider>
    </>
  );
}
