import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import JobList from './container/joblist/joblist';
import Application from './container/application/application';
import LogIn from './container/login/login';
import SignUp from './container/signup/signup';

import {
  BrowserRouter, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
const { Header, Content} = Layout;

class App extends React.Component{
    render(){
        return (
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
                        <Menu.Item key="1"><Link to='/joblist'>Job List</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/application'>Application</Link></Menu.Item>
                        {/* <Menu.Item key="3" onPress={() => {
                                    this.props.history.push('/chat');
                        }}>Chat Room</Menu.Item> */}
                        <Menu.Item key="4"><Link to='/login'>Log In</Link></Menu.Item>
                        <Menu.Item key="5"><Link to='/signup'>Sign Up</Link></Menu.Item>
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
                                <Route path='/joblist' component={JobList}></Route>
                                <Route path='/application' component={Application}></Route>
                                <Route path='/login' component={LogIn}></Route>
                                <Route path='/signup' component={SignUp}></Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </BrowserRouter>
        )
    }
}
export default App;