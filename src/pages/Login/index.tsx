import { useEffect } from 'react';
import { history, request, useRequest } from 'umi';
import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';
// import { userName } from 'config'

import icon from '@/images/login_icon.png';
import illustration from '@/images/icon_algo.png';
import passwordImg from '@/images/password.png';
import usernameImg from '@/images/username.png';

import styles from './login.modules.less';

export type LoginParams = {
  username: string;
  password: string;
};
export const login = (data: LoginParams) =>
  request<ResType.Normal<any>>('/sys/login', {
    method: 'post',
    data,
  });

const Login = () => {
  const { refresh } = useModel('@@initialState');
  const [form] = Form.useForm();
  // const _userName = userName()

  const loginHook = useRequest(
    (values) =>
      Promise.race([
        login(values),
        new Promise((resolve, reject) => {
          setTimeout(
            () => reject({ message: 'Login over Time, please try again' }),
            20000,
          );
        }),
      ]),
    {
      manual: true,
      onSuccess: (res) => {
        const {
          data: {
            token,
            userInfo: { realname, employerId },
            role: { dataPermission, userId },
          },
        } = res;

        localStorage.setItem('paperless_token', token);
        localStorage.setItem('paperless_userId', userId);
        localStorage.setItem('paperless_realname', realname);
        localStorage.setItem('paperless_dataPermission', dataPermission);
        // localStorage.setItem('paperless_username', username)
      },
    },
  );
  const onFinish = async (values: LoginParams) => {
    history.push('/');

    setTimeout(() => {
      refresh();
    }, 0);
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
            onFinish={onFinish}
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
                loading={loginHook.loading}
                shape="round"
                block
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
