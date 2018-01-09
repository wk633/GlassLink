import React from 'react';
import {Menu} from 'antd';
import {withRouter, Link} from 'react-router-dom';

@withRouter
class MyMenu extends React.Component{
    render(){
        const map = ['/joblist', '/application', '/chat','/login', '/signup'];
        const path = this.props.location.pathname;
        let selectedIdx = (map.indexOf(path) === -1) ? 4 : map.indexOf(path) + 1;

        return (
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[selectedIdx+'']}
                style={{ lineHeight: '48px' }}
            >
                <Menu.Item key="1"><Link to='/joblist'>Job List</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/application'>Application</Link></Menu.Item>
                {/* <Menu.Item key="3" onPress={() => {
                            this.props.history.push('/chat');
                }}>Chat Room</Menu.Item> */}
                <Menu.Item key="4"><Link to='/login'>Log In</Link></Menu.Item>
                <Menu.Item key="5"><Link to='/signup'>Sign Up</Link></Menu.Item>
            </Menu>
        )
    }
}
export default MyMenu;