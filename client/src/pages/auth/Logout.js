import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/actions/auth/logout";
import React, { useRef } from 'react';
import { Spin, Space } from 'antd';

function Logout() {
    const dispatch = useDispatch();

    // Get logged in user
    const { loggedInUser } = useSelector(state => state.logoutReducer);

    // If user logged out already, redirect to home
    if (!loggedInUser) {
        window.location.href = '/'
    }

    // Set flag for user initiated logout
    const isLogoutInitiated = useRef(true);

    // Check if user initiated logout already
    if (isLogoutInitiated.current) {
        isLogoutInitiated.current = false;
        dispatch(logout())
    }

    return (
        <Space size="middle">
            <Spin size="large" />
        </Space>
    );
}

export default Logout;