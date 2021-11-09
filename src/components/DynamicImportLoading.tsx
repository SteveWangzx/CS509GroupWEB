import { Spin } from 'antd';

export default () => (
  <div
    style={{
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin size="small" />
  </div>
);
