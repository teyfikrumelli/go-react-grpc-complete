import { getMetadata } from "./utils/LocalStorageUtils";
import { GetUserRequest, UserServicePromiseClient } from "../pb/user_service_grpc_web_pb"
import UnaryInterceptor from "./Interceptor";
import { getHostName } from "./utils/ServicesUtils";

let client = new UserServicePromiseClient(
    getHostName(),
    null,
    {'unaryInterceptors': [new UnaryInterceptor()]});

const UserService = {
    getUser(userId, cb) {

        let getUserRequest = new GetUserRequest();
        getUserRequest.setUserId(userId);

        client.getUser(getUserRequest, getMetadata()).then((response) => {
            cb(null, {
                userId: response.getUserId(),
                username: response.getUsername(),
                email: response.getEmail(),
            })
        }).catch((error) => {
            cb(error, null)
        });
    }
};

export default UserService;
