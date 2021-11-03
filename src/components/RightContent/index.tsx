import React from 'react';
import { history, request } from 'umi';
import { Menu, Modal, Dropdown, Avatar, Button, Form, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import SearchForm from '@/components/RightContent/SearchForm';

export default () => {
  return (
    <>
      <SearchForm />
      <Avatar
        icon={<UserOutlined />}
        // style={{ marginRight: '10px' }}
      />
      <Button
        type="link"
        onClick={() => {
          history.push('/login');
        }}
      >
        Sigh in
      </Button>
    </>
  );
};
