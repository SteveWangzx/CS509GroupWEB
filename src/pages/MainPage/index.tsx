import React, { useEffect, useState } from 'react';
import {
  Button,
  Layout,
  Menu,
  Modal,
  TreeSelect,
  Form,
  Input,
  message,
} from 'antd';
import { request, history } from 'umi';
import SearchForm from '@/components/RightContent/SearchForm';
import Algorithms from '@/pages/Algorithms';
import Introduction from '@/pages/Introduction';
import { userName } from 'config';

export default function IndexPage() {
  const { Sider, Content, Header } = Layout;
  const { SubMenu } = Menu;
  const { TreeNode } = TreeSelect;
  const [data, setData] = useState<any>();
  const [dataTree, setDataTree] = useState<any>();
  const [menuData, setMenuData] = useState<any>();
  const [ClassVisible, setClassVisible] = useState<boolean>(false);
  const [AlgoVisible, setAlgoVisible] = useState<boolean>(false);
  const [value, setValue] = useState(undefined);
  const [form_class] = Form.useForm();
  const [form_algo] = Form.useForm();
  const [algoParam, setAlgoParam] = useState<any>('0');
  const [refresh, setRefresh] = useState<boolean>(false);

  const onTreeChange = () => {
    setValue(value);
  };
  const handleClick = (info: any) => {
    setAlgoParam(info.key);
  };

  const testUrl = async () => {
    await request(
      'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/get',
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
    getClassification()
      .then((res) => {
        const data_menu = recursionMenu(res.data);
        const data_tree = recursionTree(res.data);
        setDataTree(data_tree);
        setMenuData(data_menu);
      })
      .then(() => {
        console.log(dataTree);
      });
  }, []);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false));
  }, [refresh]);

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

  const recursionTree = (data: any) => {
    const dataSource = data;

    return Object.values(data).map((item: any, index: any) => {
      if (item.cid) {
        return (
          <TreeNode value={item.cid} title={`${item.name}`}>
            {item.sub && recursionTree(item.sub)}
          </TreeNode>
        );
      }
    });
  };

  const showClassModel = () => {
    setClassVisible(true);
    form_class.resetFields();
  };
  const showAlgoModal = () => {
    setAlgoVisible(true);
    form_algo.resetFields();
  };
  const handleAlgoOk = () => {
    setAlgoVisible(false);
    form_algo.resetFields();
    refresh ? setRefresh(false) : setRefresh(true);
  };
  const handleClassOk = () => {
    setClassVisible(false);
    form_class.resetFields();
  };
  const handleAlgoCancel = () => {
    setAlgoVisible(false);
    form_algo.resetFields();
  };
  const handleClassCancel = () => {
    setClassVisible(false);
    form_class.resetFields();
  };

  const SubmitClassification = () => {
    form_class.validateFields().then(() => {
      const { cid, name } = form_class.getFieldsValue();
      const data = {
        url: '',
        parentcid: cid,
        name: name,
      };
      console.log(data);
      request(
        'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/add',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleClassOk();
        history.push('/');
      });
    });
  };
  const SubmitAlgorithm = () => {
    form_algo.validateFields().then(() => {
      const { cid, name, introduction, content, timecplx, spacecplx } =
        form_algo.getFieldsValue();
      const data = {
        url: '',
        parentcid: cid,
        name: name,
        introduction: introduction,
        content: content,
        timecplx: timecplx,
        spacecplx: spacecplx,
      };
      console.log(data);
      request(
        'https://0y5wxsu5t0.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/add',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleAlgoOk();
        history.push('/');
      });
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
          <Menu
            theme="dark"
            mode="inline"
            onClick={(info) => {
              handleClick(info);
            }}
            defaultSelectedKeys={['0']}
          >
            <Menu.Item key="0" title="introduction">
              Introduction
            </Menu.Item>
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
                if (localStorage.getItem('ams_uname')) {
                  showClassModel();
                } else {
                  message.error('Please login to operate');
                }
              }}
            >
              add Classification
            </Button>
            <Button
              type="primary"
              style={{ display: 'inline' }}
              onClick={() => {
                if (localStorage.getItem('ams_uname')) {
                  showAlgoModal();
                } else {
                  message.error('Please login to operate');
                }
              }}
            >
              add Algorithm
            </Button>
            <Modal
              title="Add Classification"
              visible={ClassVisible}
              footer={[
                <Button type="primary" onClick={() => handleClassCancel()}>
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => SubmitClassification()}>
                  Submit
                </Button>,
              ]}
              onCancel={handleClassCancel}
            >
              <Form form={form_class}>
                <Form.Item
                  name="cid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a parent classification',
                    },
                  ]}
                  label="Parent classification"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select parent classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    <TreeNode value={'0'} title={'topLevel'}>
                      {dataTree}
                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'classification name cannot be empty!',
                    },
                  ]}
                  label="Classification name"
                >
                  <Input
                    placeholder="Please Enter name for classification"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Add Algorithm"
              visible={AlgoVisible}
              footer={[
                <Button type="primary" onClick={() => handleAlgoCancel()}>
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => SubmitAlgorithm()}>
                  Submit
                </Button>,
              ]}
              onCancel={handleAlgoCancel}
            >
              <Form form={form_algo}>
                <Form.Item
                  name="cid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a parent classification',
                    },
                  ]}
                  label="Parent classification"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select parent classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {dataTree}
                  </TreeSelect>
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'algorithm name cannot be empty!',
                    },
                  ]}
                  label="Algorithm name"
                >
                  <Input
                    placeholder="Please Enter name for algorithm"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="introduction"
                  rules={[
                    {
                      required: true,
                      message: 'introduction cannot be empty!',
                    },
                  ]}
                  label="introduction"
                >
                  <Input
                    placeholder="Please Enter introduction for algorithm"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="content"
                  rules={[
                    { required: true, message: 'content cannot be empty!' },
                  ]}
                  label="content"
                >
                  <Input
                    placeholder="Please Enter content for algorithm"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="timecplx"
                  rules={[
                    {
                      required: true,
                      message: 'Time complexity cannot be empty!',
                    },
                  ]}
                  label="Time complexity"
                >
                  <Input
                    placeholder="Please Enter Time complexity for algorithm"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="spacecplx"
                  rules={[
                    {
                      required: true,
                      message: 'Space complexity cannot be empty!',
                    },
                  ]}
                  label="Space complexity"
                >
                  <Input
                    placeholder="Please Enter Space complexity for algorithm"
                    autoComplete="off"
                  ></Input>
                </Form.Item>
              </Form>
            </Modal>
          </Header>
          <Content
            style={{ margin: '24px 16px 16px 16px', overflow: 'initial' }}
          >
            <div
              style={{ padding: '24px', minHeight: '360', background: '#FFF' }}
            >
              {algoParam && algoParam == '0' ? (
                <Introduction />
              ) : (
                <Algorithms aid={algoParam as string} />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
