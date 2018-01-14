import React from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import axios from 'axios';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../reducer/user';
import './login.css';
const FormItem = Form.Item;
message.config({
    top: 54
})

@Form.create()
@withRouter
@connect(
    state=>state.user,
    {login}
)
class LogIn extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login({user: values.userName, pwd: values.password});
            }
        });
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.msg !== this.props.msg){
            if(nextProps.msg.type === 'info'){
                message.info(nextProps.msg.content);
            }else if(nextProps.msg.type === 'error'){
                message.error(nextProps.msg.content);
            }
        }
        
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form-wrapper'>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Log In</h2>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;Or <Link to="/signup">Sign up now!</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default LogIn;