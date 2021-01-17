import { AuthService } from '../../../services';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../../types/auth";

/**
 *
 * @param username
 * @param password
 * @param email
 * @returns {function(...[*]=)}
 */
export function register(username, password, email) {
    return dispatch => {
        dispatch({ type: REGISTER_REQUEST });

        AuthService.register(username, password, email,(err, response) => {
            if (err) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err
                });
            } else {
                localStorage.setItem('user', JSON.stringify(response));

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response
                });
            }
        });
    };
}