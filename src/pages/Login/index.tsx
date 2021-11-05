import { useEffect } from 'react';
import { history, request, useRequest } from 'umi';
import { Button, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';
// import { userName } from 'config'

import icon from '@/images/login_icon.png';
import illustration from '@/images/icon_algo.png';
import passwordImg from '@/images/password.png';
import usernameImg from '@/images/username.png';

import styles from './login.modules.less';

export type LoginParams = {
  uname: string;
  password: string;
};

const login_set = async (data: any) => {
  const res = await request(
    'https://jgt79w01d3.execute-api.us-east-2.amazonaws.com/Alpha/login',
    {
      method: 'post',
      data,
    },
  ).then((res) => {
    const { uname, type, statusType } = res;
    localStorage.setItem('ams_uname', uname);
    localStorage.setItem('ams_type', type);
    localStorage.setItem('ams_statusType', statusType);
  });
  console.log(localStorage.getItem('ams_name'));
};

const Login = () => {
  const { refresh } = useModel('@@initialState');
  const [form] = Form.useForm();
  // const _userName = userName()

  const login_set = async (data: any) => {
    await request(
      'https://jgt79w01d3.execute-api.us-east-2.amazonaws.com/Alpha/login',
      {
        method: 'post',
        data,
      },
    )
      .then((res) => {
        const { msg, data } = res;
        const { uname, type } = data;
        localStorage.setItem('ams_uname', uname);
        localStorage.setItem('ams_type', type);
        console.log(res);
        message.success(msg);
        history.push('/');
        // localStorage.setItem('ams_statusType', statusType);
      })
      .catch((err) => {
        message.error(err.msg);
      });
  };
  const loginHook = () => {
    form.validateFields().then(() => {
      const { username, password } = form.getFieldsValue();
      const data = {
        uname: username,
        password: password,
      };
      login_set(data);
    });
  };
  const onFinish = async (values: LoginParams) => {
    history.push('/');

    setTimeout(() => {
      refresh();
    }, 0);
  };

  const test = (data: LoginParams) => {
    request(
      'https://jgt79w01d3.execute-api.us-east-2.amazonaws.com/Alpha/classification',
      {
        method: 'get',
        // data: {
        //   uname: '111',
        //   password: '111111'
        // },
      },
    );
  };

  return (
    <div className={styles['login-wrap']}>
      <div className={styles['login-wrap-center']}>
        <div className={styles['logo-wrap']}>
          <img src={illustration} className={styles.illustration} />
        </div>
        <div className={styles['form-wrap']}>
          <div>
            <div className={styles.title}>Algorithm Management System</div>
            <div className={styles.welcome}>WELCOME TO SIGN IN</div>
          </div>

          <Form
            // onFinish={onFinish}
            form={form}
            style={{ marginTop: 15 }}
            // initialValues={{ password: 'lgkj@wl' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Username cannot be empty!' }]}
            >
              <Input
                bordered={false}
                placeholder="Please Enter Username"
                prefix={
                  <img
                    src={usernameImg}
                    style={{ width: 18, marginRight: 10 }}
                  />
                }
                autoComplete="off"
              />
            </Form.Item>
            <div className={styles.divider} />
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password can not be empty!' },
              ]}
            >
              <Input.Password
                bordered={false}
                placeholder="Please Enter Password"
                prefix={
                  <img
                    src={passwordImg}
                    style={{ width: 18, marginRight: 10 }}
                  />
                }
                autoComplete="off"
              />
            </Form.Item>
            <div className={styles.divider} />
            <div className={styles.divider} />
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                shape="round"
                block
                onClick={() => {
                  loginHook();
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.divider} />
          <div>
            Don't have an account?
            <Button
              type="link"
              onClick={() => {
                history.push('/create');
              }}
            >
              create a new account
            </Button>
            <Button
              type="link"
              onClick={() => {
                history.push('/');
              }}
            >
              Enter as anonymous user
            </Button>
          </div>
        </div>

        <div className={styles.copyright}>
          CS509 Zhixiang Wang
          {/* {info.updateDate} */}
        </div>
      </div>
    </div>
  );
};

// 函数组件
export default Login;
