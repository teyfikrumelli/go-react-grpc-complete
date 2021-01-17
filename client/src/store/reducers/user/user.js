import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from "../../types/user";

const initialState = {
    data: {},
    loading: true,
    error: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_REQUEST:
            return {
                ...initialState,
                loading: true,
            };
        case GET_USER_SUCCESS:
            return {
                error: false,
                loading: false,
                data: payload,
            };
        case GET_USER_FAIL:
            return {
                loading: false,
                error: true,
                data: payload,
            };
        default:
            return state;
    }
}