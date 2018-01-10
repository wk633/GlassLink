import React from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import './login.css';
const FormItem = Form.Item;
message.config({
    top: 54
})

@Form.create()
@withRouter
class LogIn extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('/user/login', {user: values.userName, pwd: values.password})
                .then(res=>{
                    if(res.status === 200){
                        if(res.data.code === 0){
                            message.success('log in success');
                            this.props.history.push('/joblist');
                        }else{
                            message.error(res.data.errmsg);
                        }
                    }else{
                        message.error('network error');
                    }
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form-wrapper'>
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