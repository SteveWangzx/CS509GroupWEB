import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { request } from 'umi';
import SearchForm from '@/components/RightContent/SearchForm';
import Algorithms from '@/pages/Algorithms';

export default function IndexPage() {
  const { Sider, Content, Header } = Layout;
  const tree = {
    class1: {
      subclass1: {
        algorithm1: '123',
        algorithm2: '123',
      },
    },
    class2: {
      subclass2: {
        algorithm2: '123',
        algorithm3: '123',
      },
    },
  };
  console.log(tree);

  const getClassification = () => {
    request(
      'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification',
      {
        method: 'get',
      },
    );
  };

  return (
    <>
      <Layout>
        <Sider
          theme="dark"
          collapsible={true}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <SearchForm />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">nav1</Menu.Item>
            <Menu.Item key="2">nav2</Menu.Item>
            <Menu.Item key="3">nav3</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header
            style={{
              padding: 0,
              background: '#FFF',
              overflow: 'initial',
              marginLeft: '24px',
            }}
          >
            <Button
              type="primary"
              style={{ display: 'inline' }}
              onClick={() => {
                getClassification();
              }}
            >
              getClassification
            </Button>
          </Header>
          <Content
            style={{ margin: '24px 16px 16px 16px', overflow: 'initial' }}
          >
            <div
              style={{ padding: '24px', minHeight: '360', background: '#FFF' }}
            >
              <Algorithms aName="haha" />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
