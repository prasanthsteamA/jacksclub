import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import BalanceComponent from './components/Balance/BalanceComponent';
import TransactionComponent from './components/Transaction/TransactionComponent';
import './App.css'

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    setSelectedMenuKey(key);
  };

  return (
    <Layout>
      <Sider style={{background:"rgb(13, 63, 75)"}} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
        <img src="https://www.pngall.com/wp-content/uploads/1/Bank-Transparent.png" alt="Logo" />

        </div>
        <Menu
        style={{background:"rgb(13, 63, 75)"}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuKey]}
          onClick={({ key }) => handleMenuClick(key.toString())}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Balance',
            },
            {
              key: '2',
              icon: <DollarOutlined />,
              label: 'Transaction',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 700,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedMenuKey === '1' ? <BalanceComponent /> : <TransactionComponent />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
