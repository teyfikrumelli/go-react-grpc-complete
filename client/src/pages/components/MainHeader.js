import React from 'react';
import {
    Link
} from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, LoginOutlined, LogoutOutlined, FormOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";

const { SubMenu } = Menu;

function MainHeader() {

    // Get logged in user to set main header accordingly
    const { loggedInUser } = useSelector(state => state.loginReducer);

    return (
        <Menu mode="horizontal" theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FormOutlined />}>
                <Link to="/register">Register</Link>
            </Menu.Item>
            {
                loggedInUser
                    ?
                    <Menu.Item icon={<UserOutlined />}>
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    :
                    null
            }
            {
                loggedInUser
                ?
                <Menu.Item icon={<LogoutOutlined />}>
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
                :
                <Menu.Item icon={<LoginOutlined />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>
            }
        </Menu>
    );
}

export default MainHeader;