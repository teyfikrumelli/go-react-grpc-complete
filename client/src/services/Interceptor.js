import {getMetadata} from "./utils/LocalStorageUtils";
import * as grpcWeb from "grpc-web"
import {AuthService} from "./index"

/**
 * @constructor
 * @implements {UnaryInterceptor}
 */
const UnaryInterceptor = function() {};

/** @override */
UnaryInterceptor.prototype.intercept = function(request, invoker) {

    return invoker(request).then((response) => {
        return response;
    }).catch((error) => {

        if (error.code === grpcWeb.StatusCode.UNAUTHENTICATED) {

            return new Promise((resolve,reject) => {
                AuthService.refresh((err, res) => {

                    if (!err) {
                        localStorage.setItem('user', JSON.stringify(res));

                        request.b = getMetadata();

                        invoker(request).then((response) => {
                            return resolve(response);
                        }).catch((error) => {
                            return reject(error);
                        })
                    } else {
                        if (err.code === grpcWeb.StatusCode.UNAUTHENTICATED) {
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }
                        return reject(err);
                    }
                });
            })
        } else {
            return Promise.reject(error);
        }
    })

};

export default UnaryInterceptor;