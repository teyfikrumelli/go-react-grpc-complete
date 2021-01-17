import { LoginRequest, RegisterRequest, RefreshRequest, AuthServiceClient } from "../pb/auth_service_grpc_web_pb"
import { getRefreshToken } from "./utils/LocalStorageUtils";
import { getHostName } from "./utils/ServicesUtils";

let client = new AuthServiceClient(
    getHostName(),
    null,
    null);

const AuthService = {
    login(username, password, cb) {

        let loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        client.login(loginRequest, null, (error, response) => {
            if (error) {
                cb(error, null)
            } else {
                cb(error, {
                    accessToken: response.getAccessToken(),
                    refreshToken: response.getRefreshToken(),
                    id: response.getUserId(),
                })
            }
        });
    },

    register(username, password, email, cb) {

        let registerRequest = new RegisterRequest();
        registerRequest.setUsername(username);
        registerRequest.setPassword(password);
        registerRequest.setEmail(email);

        client.register(registerRequest, null, (error, response) => {
            if (error) {
                cb(error, null)
            } else {
                cb(error, {
                    accessToken: response.getAccessToken(),
                    refreshToken: response.getRefreshToken(),
                    id: response.getUserId(),
                })
            }
        });
    },

    refresh(cb) {

        let refreshRequest = new RefreshRequest();
        refreshRequest.setRefreshToken(getRefreshToken());

        client.refresh(refreshRequest, null, (error, response) => {
            if (error) {
                cb(error, null)
            } else {
                cb(error, {
                    accessToken: response.getAccessToken(),
                    refreshToken: response.getRefreshToken(),
                    id: response.getUserId(),
                })
            }
        });
    },

    logout(cb) {
        localStorage.removeItem('user')
        cb(null)
    }
};

export default AuthService;
