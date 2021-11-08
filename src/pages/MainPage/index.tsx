import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { request } from 'umi';
import SearchForm from '@/components/RightContent/SearchForm';
import Algorithms from '@/pages/Algorithms';
import { userName } from 'config';

export default function IndexPage() {
  const { Sider, Content, Header } = Layout;
  const { SubMenu } = Menu;
  const [data, setData] = useState<any>();
  const [menuData, setMenuData] = useState<any>();

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
  const testUrl = async () => {
    await request(
      'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm',
      {
        method: 'get',
        params: {
          aid: '1',
        },
      },
    );
  };

  const getClassification = async () => {
    const res = await request(
      'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification',
      {
        method: 'get',
      },
    );
    return res;
  };

  useEffect(() => {
    getClassification().then((res) => {
      const data_menu = recursionMenu(res.data);
      setMenuData(data_menu);
      console.log(data_menu);
    });
  }, []);

  const recursionMenu = (data: any) => {
    const dataSource = data;

    return Object.values(data).map((item: any, index: any) => {
      if (item.cid) {
        return (
          <SubMenu key={item.cid} title={`C:${item.name}`}>
            {item.sub && recursionMenu(item.sub)}
          </SubMenu>
        );
      } else if (item.aid) {
        return (
          <Menu.Item key={item.aid} title={`A:${item.name}`}>
            A:{item.name}
          </Menu.Item>
        );
      }
    });
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
            {menuData}
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
                testUrl();
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
