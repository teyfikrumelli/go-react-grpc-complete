import { AuthService } from '../../../services';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../../types/auth";

/**
 *
 * @param email
 * @param password
 * @returns {function(...[*]=)}
 */
export function login(email, password) {
    return dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        AuthService.login(email, password, (err, response) => {
            if (err) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err
                });
            } else {
                localStorage.setItem('user', JSON.stringify(response));

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response
                });
            }
        });
    };
}