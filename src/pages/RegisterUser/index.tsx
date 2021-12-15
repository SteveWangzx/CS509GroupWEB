import React, { useEffect, useState, useRef } from 'react';
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
import type { registerUsers } from '@/services/TypeUser';
import { fetchUsers } from '@/services/TypeUser';
import { request } from 'umi';
import UserActivity from '@/pages/RegisterUser/UserActivity';

const intlMap = {
  enUSIntl,
};

const type: { [key: string]: string } = {
  '0': 'Administrator',
  '1': 'Registered User',
};

export default function () {
  const actionRef = useRef<ActionType>();
  const [UAvisible, setUAvisible] = useState<boolean>(false);
  const uid = localStorage.getItem('ams_uid');
  const quid_ref = useRef<string>('');

  const handleUAClick = () => {
    setUAvisible(true);
  };

  const handleUACancel = () => {
    setUAvisible(false);
  };

  const deleteUser = (duid: string) => {
    request(
      'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/adminstor/deleteRegisterUser',
      {
        method: 'POST',
        data: {
          duid: duid,
          uid: uid,
        },
      },
    )
      .then((res) => {
        message.success('Delete Success');
      })
      .then((res) => {
        actionRef?.current?.reload();
      })
      .catch((err) => {
        message.error('Delete Failed');
      });
  };

  const columns: ProColumns<registerUsers>[] = [
    {
      title: 'User Name',
      dataIndex: 'uname',
      search: false,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      search: false,
    },
    {
      title: 'User ID',
      dataIndex: 'uid',
      search: false,
    },
    {
      title: 'User Type',
      dataIndex: 'type',
      search: false,
      render: (row, text) => {
        return type[text.type];
      },
    },
    {
      title: 'Operate',
      valueType: 'option',
      search: false,
      render: (row, text) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                quid_ref.current = text.uid;
                handleUAClick();
              }}
            >
              View User Activities
            </Button>
            <Button
              type="link"
              onClick={() => {
                deleteUser(text.uid);
              }}
            >
              Delete User
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <ConfigProvider locale={intlMap.enUSIntl}>
        <ProTable<registerUsers>
          columns={columns}
          actionRef={actionRef}
          headerTitle="Registered Users"
          search={{
            optionRender: false,
            collapsed: false,
          }}
          request={async (params, sort) => {
            const { data } = await fetchUsers();
            return {
              data,
            };
          }}
        ></ProTable>
      </ConfigProvider>

      <Modal
        title="User Activities"
        visible={UAvisible}
        footer={false}
        onCancel={handleUACancel}
      >
        <UserActivity quid={quid_ref.current} />
      </Modal>
    </>
  );
}
