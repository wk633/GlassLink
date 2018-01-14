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
import MyMenu from './component/menu/menu';

import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;
const store = createStore(reducer, compose(applyMiddleware(thunk), reduxDevTools));


const { Header, Content} = Layout;
class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout className="layout">
                        <Header style={{height: 48}}>
                        <div className="logo" />
                        <MyMenu></MyMenu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ padding: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>Job List</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
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
            </Provider>
        )
    }
}
export default App;