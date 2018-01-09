import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, message} from 'antd';
import axios from 'axios';
import './signup.css';

const FormItem = Form.Item;
message.config({
    top: 54
})

@Form.create()
class SignUp extends React.Component{
    state = {
        confirmDirty: false
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        console.log(e, e.target);
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        // called by confirm password
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        // called by password
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['password2'], { force: true }); // when state is dirty check password again
        }
        callback();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);

            axios.post('/user/signup', {user: values.userName, pwd: values.password})
            .then(res=>{
                console.log(res);
                if(res.status === 200){
                    if(res.data.code === 0){
                        // do something
                        message.success('sign up success');
                    }else{
                        message.error(res.data.errmsg);
                    }
                }
            })
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='signup-form-wrapper'>
                <Form onSubmit={this.handleSubmit} className="signup-form">
                    <h2>Sign Up</h2>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' },
                                { validator: this.checkConfirm}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password2', {
                        rules: [{ required: true, message: 'Please confirm your Password!' }, 
                                { validator: this.checkPassword}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;Or <Link to="/login">login now!</Link>
                    </FormItem>
                </Form>
            </div>
        )
      }
}

export default SignUp;