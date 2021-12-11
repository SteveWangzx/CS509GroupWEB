import React from 'react';
import { Typography } from 'antd';
import Field from '@ant-design/pro-field';

export default function () {
  const { Title, Paragraph, Text, Link } = Typography;

  return (
    <Typography>
      <Title>Welcome to Algorithm Management System</Title>
      <Title level={2}>Introduction</Title>
      <Paragraph>
        This is a web application created by Zhixiang Wang, Zeyu Hu, Jin Yang,
        Yibo Teng and Xuhui Fan
      </Paragraph>
      <Title level={2}>How to use Algorithm Management System</Title>
      <Paragraph>
        First you need to click 'register' on the top-right of the page, then
        try to register an account and log in. You can use this website as
        anonymous user if you want. But you can't edit anything on this website
        if you didn't login. Menu on main page might loading for a while due to
        different network conditions.
        <br />
        <Text code>'C:'</Text>represents classification and{' '}
        <Text code>'A:' </Text>represents algorithm
        <br />
        <br />
        You can use the buttons above to edit menu.
        <br />
        <br />
        To add implmentation for an algorithm, just click the algorithm you want
        to edit then click the button below.
        <br />
        <br /> Sometimes implementation could load for a while.
      </Paragraph>
    </Typography>
  );
}
