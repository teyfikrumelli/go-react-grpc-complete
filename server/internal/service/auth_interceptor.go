package service

import (
	"context"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

var accessibleRoutes = map[string]bool{
	"/grgc.AuthService/Register": true,
	"/grgc.AuthService/Login":    true,
	"/grgc.AuthService/Refresh":  true,
}

// AuthInterceptor is a server interceptor for authentication
type AuthInterceptor struct {
	jwtManager *JWTManager
}

// NewAuthInterceptor returns a new auth interceptor
func NewAuthInterceptor(jwtManager *JWTManager) *AuthInterceptor {
	return &AuthInterceptor{jwtManager}
}

// Unary returns a server interceptor function to authenticate and authorize unary RPC
func (interceptor *AuthInterceptor) Unary() grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		log.Println("--> auth interceptor: ", info.FullMethod)

		err := interceptor.authenticate(ctx, info.FullMethod)
		if err != nil {
			return nil, err
		}

		return handler(ctx, req)
	}
}

// authenticate checks if request is authorized for called method
func (interceptor *AuthInterceptor) authenticate(ctx context.Context, method string) error {

	_, ok := accessibleRoutes[method]
	if ok {
		return nil
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	values := md["authorization"]
	if len(values) == 0 {
		return status.Errorf(codes.Unauthenticated, "authorization token is not provided")
	}

	accessToken := values[0]
	_, err := interceptor.jwtManager.Verify(accessToken)
	if err != nil {
		return status.Errorf(codes.Unauthenticated, "access token is invalid: %v", err)
	}

	return nil
}
