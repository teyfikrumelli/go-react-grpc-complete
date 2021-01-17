import { UserService } from '../../../services';
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from "../../types/user";

/**
 *
 * @param userId
 * @returns {function(...[*]=)}
 */
export function getUser(userId) {
    return dispatch => {
        dispatch({ type: GET_USER_REQUEST });

        UserService.getUser(userId, (err, response) => {
            if (err) {
                dispatch({
                    type: GET_USER_FAIL,
                    payload: err
                });
            } else {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response
                });
            }
        });
    };
}