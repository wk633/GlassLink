import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import JobList from './container/joblist/joblist';
import Application from './container/application/application';
import LogIn from './container/login/login';
import SignUp from './container/signup/signup';
import AuthRouter from './component/authrouter/authrouter';

import {
  BrowserRouter, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';
import MyMenu from './component/menu/menu';
const { Header, Content} = Layout;

class App extends React.Component{
    render(){
        console.log(this)
        return (
            <BrowserRouter>
                <Layout className="layout">

                    <Header>
                    <div className="logo" />
                    <MyMenu></MyMenu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ padding: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Job List</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            content
                            <AuthRouter></AuthRouter>
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