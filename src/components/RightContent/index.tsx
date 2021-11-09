import React, { useState } from 'react';
import { history, request } from 'umi';
import { Menu, Modal, Dropdown, Avatar, Button, Form, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import SearchForm from '@/components/RightContent/SearchForm';

export default () => {
  const userName = localStorage.getItem('ams_uname');

  return (
    <>
      <Avatar
        icon={<UserOutlined />}
        size="large"
        // style={{ marginRight: '10px' }}
      />
      <div style={{ color: 'white' }}>
        {userName ? `Welcome! ${userName}` : 'Anonymous User'}
      </div>
      <Button
        type="link"
        onClick={() => {
          localStorage.clear(),
            userName ? history.push('/login') : history.push('/create');
        }}
      >
        {userName ? 'Sign out' : 'Register'}
      </Button>
    </>
  );
};
