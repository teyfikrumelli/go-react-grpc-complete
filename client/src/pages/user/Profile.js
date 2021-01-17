import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { getUser } from '../../store/actions/user/user';
import { getUserId } from '../../services/utils/LocalStorageUtils'

function Profile() {

    // Get user details
    const { data, loading, error } = useSelector(state => state.userReducer);

    // Get user id from local storage
    let userId = getUserId();

    // Dispatch user data
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(userId));
    }, []);

    return (
        <Card title={data.username} loading={loading} bordered={false} style={{ width: 300 }}>
            <p>id: {data.userId}</p>
            <p>email: {data.email}</p>
        </Card>
    );
}

export default Profile;
