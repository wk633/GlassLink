import React from 'react';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRouter extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/signup'];
        const currentPath = this.props.location.pathname;
        console.log(currentPath);
        if(publicList.indexOf(currentPath) === -1){
            this.props.history.push('/login');
        }
    }
    render(){
        return null;
    }
}
export default AuthRouter;