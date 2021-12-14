import React, { useEffect, useState } from 'react';
import { createIntl, IntlProvider, ProColumns } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import enUSIntl from 'antd/lib/locale/en_US';
import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  message,
  Input,
  Select,
} from 'antd';

const intlMap = {
  enUSIntl,
};

export default function () {
  return (
    <div>
      Register User
      <ConfigProvider locale={intlMap.enUSIntl}></ConfigProvider>
    </div>
  );
}
