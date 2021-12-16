import React, { useState, useEffect } from 'react';
import { history, request } from 'umi';
import { Menu, Modal, Dropdown, Avatar, Button, Form, Input } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import SearchForm from '@/components/RightContent/SearchForm';

export default () => {
  const userName = localStorage.getItem('ams_uname');
  const [data, setdata] = useState<any>();

  const userLogin = () => {
    if (userName) {
      return [
        <Button
          type="link"
          onClick={() => {
            localStorage.clear();
            history.push('/');
          }}
        >
          {'Sign out'}
        </Button>,
      ];
    } else {
      return [
        <>
          <Button
            type="link"
            onClick={() => {
              history.push('/create');
            }}
          >
            {'Register'}
          </Button>
          <Button
            type="link"
            onClick={() => {
              history.push('/login');
            }}
          >
            {'Sign in'}
          </Button>
        </>,
      ];
    }
  };

  useEffect(() => {
    console.log(userName);
    const data = userLogin();
    setdata(data);
  }, [userName]);

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
      {data}
    </>
  );
};
