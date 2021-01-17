import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/auth/login";
import React, { useRef } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
    const dispatch = useDispatch();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Get logged in user
    const { loggedInUser } = useSelector(state => state.loginReducer);

    // If user already logged in, redirect to current path
    const isLoginInitiated = useRef(false);
    if (loggedInUser && isLoginInitiated.current) {
        window.location.href = from.pathname
    }

    const onLogin = values => {
        isLoginInitiated.current = true;
        dispatch(login(values.email, values.password))
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={ onLogin }
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/forgot-password">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Form.Item>
        </Form>
    );
}

export default Login;