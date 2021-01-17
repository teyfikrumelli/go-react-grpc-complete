import { AuthService } from '../../../services';
import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../../types/auth";

/**
 *
 * @returns {function(...[*]=)}
 */
export function logout() {
    return dispatch => {
        dispatch({ type: LOGOUT_REQUEST });

        AuthService.logout( (err) => {
            if (err) {
                dispatch({
                    type: LOGOUT_FAIL
                });
            } else {
                dispatch({
                    type: LOGOUT_SUCCESS
                });
            }
        });
    };
}