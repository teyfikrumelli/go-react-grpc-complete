import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../../types/auth";

const initialState = { registeredUser: null, error: false };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registeredUser: payload,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
}