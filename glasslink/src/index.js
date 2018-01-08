import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Layout, Menu, Breadcrumb} from 'antd';
import {
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';
const { Header, Content} = Layout;

ReactDOM.render((
    <BrowserRouter>
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
                <Breadcrumb style={{ padding: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Job List</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    content
                    <Switch>
                        
                    </Switch>
                </div>
            </Content>
        </Layout>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
