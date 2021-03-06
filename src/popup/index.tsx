import React, { FC, Suspense, useState } from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import Hello from './pages/hello';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';

const { Header, Footer, Sider, Content } = Layout;

const Popup: FC<{}> = () => {
  const [current, setCurrent] = useState(['home'] as React.Key[]);
  return (
    <HashRouter>
      <Layout
        style={{
          background: '#fff',
          minHeight: 450,
          width: 600,
        }}
      >
        <Header style={{ padding: 0 }}>
          <Menu mode="horizontal" onClick={e => setCurrent(e.keyPath)} selectedKeys={current.map(v => String(v))}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to={'/'}>Home</Link>
            </Menu.Item>
            <Menu.Item key="hello">
              <Link to={'/hello'}>Hello</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            padding: 24,
          }}
        >
          <Switch>
            <Route exact path="/hello" component={Hello} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
      </Layout>
    </HashRouter>
  );
};

const Home: FC<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          title="Rust WebAssembly Playground"
          footer={null}
          width={900}
          style={{ userSelect: 'text' }}
        >
          <div style={{ minHeight: 200 }}>
            <Button
              onClick={async (): Promise<void> => {
                const { greet } = await import('../wasm');
                greet();
              }}
            >
              alert hello
            </Button>
          </div>
        </Modal>
      </Suspense>
    </div>
  );
};

export default Popup;
