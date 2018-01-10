import React from 'react';
import axios from 'axios';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';
message.config({
    top: 54
})

@withRouter
class AuthRouter extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/signup'];
        const currentPath = this.props.location.pathname;
        console.log(currentPath);
        if(publicList.indexOf(currentPath) === -1){
            axios.get('/user/info')
            .then((res) => {
                if(res.status === 200) {
                    if(res.data.code === 0){
                        // have login info
                    }else{
                        message.error(res.data.errmsg);
                        this.props.history.push('/login');
                    }
                }
            })
        }
    }
    render(){
        return null;
    }
}
export default AuthRouter;