/**
 * @fileoverview gRPC-Web generated client stub for grgc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.grgc = require('./user_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grgc.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grgc.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grgc.GetUserRequest,
 *   !proto.grgc.GetUserResponse>}
 */
const methodDescriptor_UserService_GetUser = new grpc.web.MethodDescriptor(
  '/grgc.UserService/GetUser',
  grpc.web.MethodType.UNARY,
  proto.grgc.GetUserRequest,
  proto.grgc.GetUserResponse,
  /**
   * @param {!proto.grgc.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.GetUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grgc.GetUserRequest,
 *   !proto.grgc.GetUserResponse>}
 */
const methodInfo_UserService_GetUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grgc.GetUserResponse,
  /**
   * @param {!proto.grgc.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.GetUserResponse.deserializeBinary
);


/**
 * @param {!proto.grgc.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grgc.GetUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grgc.GetUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grgc.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grgc.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.grgc.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grgc.GetUserResponse>}
 *     Promise that resolves to the response
 */
proto.grgc.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grgc.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser);
};


module.exports = proto.grgc;

