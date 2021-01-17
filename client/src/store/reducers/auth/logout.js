import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../../types/auth";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

const initialState = loggedInUser
    ? { loggedInUser: loggedInUser }
    : { loggedInUser: null };

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case LOGOUT_REQUEST:
            return {
                ...state,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedInUser: null,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}