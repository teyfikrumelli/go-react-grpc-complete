import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/auth/register";
import React from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

function Register() {
    const dispatch = useDispatch();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Get registered user
    const { registeredUser } = useSelector(state => state.registerReducer);

    // If registration succeed, redirect to current path
    if (registeredUser) {
        window.location.href = from.pathname
    }

    const onRegister = values => {
        dispatch(register(values.username, values.password, values.email))
    };

    return (
        <Form
            name="normal_register"
            className="login-form"
            onFinish={ onRegister }
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Register
                </Button>
                <a href="/login">Already registered?</a>
            </Form.Item>
        </Form>
    );
}

export default Register;