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
proto.grgc = require('./auth_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grgc.AuthServiceClient =
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
proto.grgc.AuthServicePromiseClient =
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
 *   !proto.grgc.RegisterRequest,
 *   !proto.grgc.RegisterResponse>}
 */
const methodDescriptor_AuthService_Register = new grpc.web.MethodDescriptor(
  '/grgc.AuthService/Register',
  grpc.web.MethodType.UNARY,
  proto.grgc.RegisterRequest,
  proto.grgc.RegisterResponse,
  /**
   * @param {!proto.grgc.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.RegisterResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grgc.RegisterRequest,
 *   !proto.grgc.RegisterResponse>}
 */
const methodInfo_AuthService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grgc.RegisterResponse,
  /**
   * @param {!proto.grgc.RegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.grgc.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grgc.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grgc.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grgc.AuthServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grgc.AuthService/Register',
      request,
      metadata || {},
      methodDescriptor_AuthService_Register,
      callback);
};


/**
 * @param {!proto.grgc.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grgc.RegisterResponse>}
 *     Promise that resolves to the response
 */
proto.grgc.AuthServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grgc.AuthService/Register',
      request,
      metadata || {},
      methodDescriptor_AuthService_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grgc.LoginRequest,
 *   !proto.grgc.LoginResponse>}
 */
const methodDescriptor_AuthService_Login = new grpc.web.MethodDescriptor(
  '/grgc.AuthService/Login',
  grpc.web.MethodType.UNARY,
  proto.grgc.LoginRequest,
  proto.grgc.LoginResponse,
  /**
   * @param {!proto.grgc.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.LoginResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grgc.LoginRequest,
 *   !proto.grgc.LoginResponse>}
 */
const methodInfo_AuthService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grgc.LoginResponse,
  /**
   * @param {!proto.grgc.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.grgc.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grgc.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grgc.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grgc.AuthServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grgc.AuthService/Login',
      request,
      metadata || {},
      methodDescriptor_AuthService_Login,
      callback);
};


/**
 * @param {!proto.grgc.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grgc.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.grgc.AuthServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grgc.AuthService/Login',
      request,
      metadata || {},
      methodDescriptor_AuthService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grgc.RefreshRequest,
 *   !proto.grgc.RefreshResponse>}
 */
const methodDescriptor_AuthService_Refresh = new grpc.web.MethodDescriptor(
  '/grgc.AuthService/Refresh',
  grpc.web.MethodType.UNARY,
  proto.grgc.RefreshRequest,
  proto.grgc.RefreshResponse,
  /**
   * @param {!proto.grgc.RefreshRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.RefreshResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grgc.RefreshRequest,
 *   !proto.grgc.RefreshResponse>}
 */
const methodInfo_AuthService_Refresh = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grgc.RefreshResponse,
  /**
   * @param {!proto.grgc.RefreshRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grgc.RefreshResponse.deserializeBinary
);


/**
 * @param {!proto.grgc.RefreshRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grgc.RefreshResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grgc.RefreshResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grgc.AuthServiceClient.prototype.refresh =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grgc.AuthService/Refresh',
      request,
      metadata || {},
      methodDescriptor_AuthService_Refresh,
      callback);
};


/**
 * @param {!proto.grgc.RefreshRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grgc.RefreshResponse>}
 *     Promise that resolves to the response
 */
proto.grgc.AuthServicePromiseClient.prototype.refresh =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grgc.AuthService/Refresh',
      request,
      metadata || {},
      methodDescriptor_AuthService_Refresh);
};


module.exports = proto.grgc;

