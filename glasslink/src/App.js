import React, { Component } from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import './App.css';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Job List</Menu.Item>
            <Menu.Item key="2">Application Manage</Menu.Item>
            <Menu.Item key="3">Chat Room</Menu.Item>
            <Menu.Item key="4">Log In</Menu.Item>
            <Menu.Item key="5">Sign Up</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Job List</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
      </Layout>
    );
  }
}

export default App;
