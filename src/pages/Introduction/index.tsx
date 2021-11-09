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
        This is a web application created by Zhixiang Wang, Zeyu Hu, Jing Yang,
        Yibo Teng and Xuhui Fan
      </Paragraph>
      <Title level={2}>How to use Algorithm Management System</Title>
      <Paragraph>
        First you need to click 'register' on the top-right of the page, then{' '}
      </Paragraph>
    </Typography>
  );
}
