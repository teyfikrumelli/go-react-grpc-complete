import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../../types/auth";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

const initialState = loggedInUser
    ? { loggedInUser: loggedInUser }
    : { loggedInUser: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loggedInUser: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedInUser: payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggedInUser: null,
            };
        default:
            return state;
    }
}