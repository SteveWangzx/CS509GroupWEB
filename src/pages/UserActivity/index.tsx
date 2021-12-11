import React, { useEffect, useState } from 'react';
import { request } from 'umi';
import { Button, Tag, Space, Menu } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { UserActivity } from '@/services/TypeActivity';

export default function IndexUserActivity() {
  const columns: ProColumns<UserActivity>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'User ID',
      dataIndex: 'uid',
      // copyable: true,
      ellipsis: true,
    },
    {
      title: 'User name',
      dataIndex: 'user',
      ellipsis: true,
    },
    {
      title: 'User Type',
      dataIndex: 'utype',
      ellipsis: true,
    },
  ];
}
