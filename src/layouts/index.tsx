import react from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;
const Layouts = () => {
  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo">
            <img src="/logo.png" />
            Algorithm Management System
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CS509 ZhixiangWang</Footer>
      </Layout>
    </>
  );
};

export default Layouts;
