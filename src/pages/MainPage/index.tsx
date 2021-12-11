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
  Space,
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
  const uid = localStorage.getItem('ams_uid');
  const [data, setData] = useState<any>();
  const [dataTree, setDataTree] = useState<any>();
  const [menuData, setMenuData] = useState<any>();
  const [algoData, setAlgoData] = useState<any>();
  const [ClassVisible, setClassVisible] = useState<boolean>(false);
  const [AlgoVisible, setAlgoVisible] = useState<boolean>(false);
  const [RemoveClassVisible, setRemoveClassVisible] = useState<boolean>(false);
  const [RemoveAlgoVisible, setRemoveAlgoVisible] = useState<boolean>(false);
  const [MergeClassVisible, setMergeClassVisible] = useState<boolean>(false);
  const [ReclassifyAlgoVisible, setReclassifyAlgoVisible] =
    useState<boolean>(false);
  const [value, setValue] = useState(undefined);
  const [form_class] = Form.useForm();
  const [form_algo] = Form.useForm();
  const [form_removeclass] = Form.useForm();
  const [form_removealgo] = Form.useForm();
  const [form_mergeclass] = Form.useForm();
  const [form_reclassifyalgo] = Form.useForm();
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
      'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/get',
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
      'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification',
      {
        method: 'get',
      },
    );
    return res;
  };

  useEffect(() => {
    getClassification().then((res) => {
      const data_menu = recursionMenu(res.data);
      const data_tree = recursionTree(res.data);
      const data_tree_algo = recursionTreeAlgo(res.data);
      setDataTree(data_tree);
      setMenuData(data_menu);
      setAlgoData(data_tree_algo);
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

  const recursionTreeAlgo = (data: any) => {
    const dataSource = data;

    return Object.values(data).map((item: any, index: any) => {
      if (item.cid) {
        return (
          <TreeNode value={item.cid} title={`C: ${item.name}`}>
            {item.sub && recursionTreeAlgo(item.sub)}
          </TreeNode>
        );
      } else if (item.aid) {
        return <TreeNode value={item.aid} title={`A: ${item.name}`}></TreeNode>;
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
  const showRemoveClassModal = () => {
    setRemoveClassVisible(true);
    form_removeclass.resetFields();
  };
  const showRemoveAlgoModal = () => {
    setRemoveAlgoVisible(true);
    form_removealgo.resetFields();
  };
  const showMergeClassModal = () => {
    setMergeClassVisible(true);
    form_mergeclass.resetFields();
  };
  const showReclassifyAlgoModal = () => {
    setReclassifyAlgoVisible(true);
    form_reclassifyalgo.resetFields();
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
  const handleRemoveClassOk = () => {
    setRemoveClassVisible(false);
    form_removeclass.resetFields();
  };
  const handleRemoveAlgoOk = () => {
    setRemoveAlgoVisible(false);
    form_removealgo.resetFields();
  };
  const handleMergeClassOk = () => {
    setMergeClassVisible(true);
    form_mergeclass.resetFields();
  };
  const handleReclassifyAlgoOk = () => {
    setReclassifyAlgoVisible(true);
    form_reclassifyalgo.resetFields();
  };
  const handleAlgoCancel = () => {
    setAlgoVisible(false);
    form_algo.resetFields();
  };
  const handleClassCancel = () => {
    setClassVisible(false);
    form_class.resetFields();
  };
  const handleRemoveClassCancel = () => {
    setRemoveClassVisible(false);
    form_removeclass.resetFields();
  };
  const handleRemoveAlgoCancel = () => {
    setRemoveAlgoVisible(false);
    form_removealgo.resetFields();
  };
  const handleMergeClassCancel = () => {
    setMergeClassVisible(false);
    form_mergeclass.resetFields();
  };
  const handleReclassifyAlgoCancel = () => {
    setReclassifyAlgoVisible(false);
    form_reclassifyalgo.resetFields();
  };

  const SubmitClassification = () => {
    form_class.validateFields().then(() => {
      const { cid, name } = form_class.getFieldsValue();
      const data = {
        url: '',
        parentcid: cid,
        name: name,
        uid: uid,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/add',
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
        uid: uid,
        name: name,
        introduction: introduction,
        content: content,
        timecplx: timecplx,
        spacecplx: spacecplx,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/add',
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

  const RemoveClassification = () => {
    form_removeclass.validateFields().then(() => {
      const { cid } = form_removeclass.getFieldsValue();
      const data = {
        cid: cid,
        uid: uid,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/remove',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleRemoveClassOk();
        history.push('/');
      });
    });
  };

  const RemoveAlgorithm = () => {
    form_removealgo.validateFields().then(() => {
      const { aid } = form_removealgo.getFieldsValue();
      const data = {
        url: '',
        aid: aid,
        uid: uid,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/remove',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleRemoveAlgoOk();
        history.push('/');
      });
    });
  };

  const MergeClassification = () => {
    form_mergeclass.validateFields().then(() => {
      const { cid1, cid2 } = form_mergeclass.getFieldsValue();
      const data = {
        url: '',
        cid1: cid1,
        cid2: cid2,
        uid: uid,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/merge',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleMergeClassOk();
        history.push('/');
      });
    });
  };

  const ReclassifyAlgorithm = () => {
    form_reclassifyalgo.validateFields().then(() => {
      const { cid, aid } = form_reclassifyalgo.getFieldsValue();
      const data = {
        url: '',
        parentcid: cid,
        aid: aid,
        uid: uid,
      };
      console.log(data);
      request(
        'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Algorithm/reclassify',
        {
          method: 'POST',
          data,
        },
      ).then((res) => {
        message.success(res.msg);
        handleReclassifyAlgoOk();
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
            <Space>
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
                Add Classification
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
                Add Algorithm
              </Button>
              <Button
                type="primary"
                style={{ display: 'inline' }}
                onClick={() => {
                  if (localStorage.getItem('ams_uname')) {
                    showRemoveClassModal();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Remove Classification
              </Button>
              <Button
                type="primary"
                style={{ display: 'inline' }}
                onClick={() => {
                  if (localStorage.getItem('ams_uname')) {
                    showRemoveAlgoModal();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Remove Algorithm
              </Button>
              <Button
                type="primary"
                style={{ display: 'inline' }}
                onClick={() => {
                  if (localStorage.getItem('ams_uname')) {
                    showMergeClassModal();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Merge Classification
              </Button>
              <Button
                type="primary"
                style={{ display: 'inline' }}
                onClick={() => {
                  if (localStorage.getItem('ams_uname')) {
                    showReclassifyAlgoModal();
                  } else {
                    message.error('Please login to operate');
                  }
                }}
              >
                Reclassify Algorithm
              </Button>
            </Space>
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
            <Modal
              title="Remove CLassification"
              visible={RemoveClassVisible}
              footer={[
                <Button
                  type="primary"
                  onClick={() => handleRemoveClassCancel()}
                >
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => RemoveClassification()}>
                  Remove
                </Button>,
              ]}
              onCancel={handleRemoveClassCancel}
            >
              <Form form={form_removeclass}>
                <Form.Item
                  name="cid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a classification',
                    },
                  ]}
                  label="Classification"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {dataTree}
                  </TreeSelect>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="remove Algorithm"
              visible={RemoveAlgoVisible}
              footer={[
                <Button type="primary" onClick={() => handleRemoveAlgoCancel()}>
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => RemoveAlgorithm()}>
                  Remove
                </Button>,
              ]}
              onCancel={handleRemoveAlgoCancel}
            >
              <Form form={form_removealgo}>
                <Form.Item
                  name="aid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a algorithm',
                    },
                  ]}
                  label="Algorithm"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select algorithm"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {algoData}
                  </TreeSelect>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="merge classification"
              visible={MergeClassVisible}
              footer={[
                <Button type="primary" onClick={() => handleMergeClassCancel()}>
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => MergeClassification()}>
                  Merge
                </Button>,
              ]}
              onCancel={handleMergeClassCancel}
            >
              <Form form={form_mergeclass}>
                <Form.Item
                  name="cid1"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a classification',
                    },
                  ]}
                  label="Classification 1"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {dataTree}
                  </TreeSelect>
                </Form.Item>
                <Form.Item
                  name="cid2"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a classification',
                    },
                  ]}
                  label="Classification 2"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {dataTree}
                  </TreeSelect>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="reclassify Algorithm"
              visible={ReclassifyAlgoVisible}
              footer={[
                <Button
                  type="primary"
                  onClick={() => handleReclassifyAlgoCancel()}
                >
                  Cancel
                </Button>,
                <Button type="primary" onClick={() => ReclassifyAlgorithm()}>
                  Reclassify
                </Button>,
              ]}
              onCancel={handleReclassifyAlgoCancel}
            >
              <Form form={form_reclassifyalgo}>
                <Form.Item
                  name="aid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a algorithm',
                    },
                  ]}
                  label="Algorithm"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select algorithm"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {algoData}
                  </TreeSelect>
                </Form.Item>
                <Form.Item
                  name="cid"
                  rules={[
                    {
                      required: true,
                      message: 'Must select a classification',
                    },
                  ]}
                  label="New Classification"
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select classification"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onTreeChange}
                  >
                    {dataTree}
                  </TreeSelect>
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
