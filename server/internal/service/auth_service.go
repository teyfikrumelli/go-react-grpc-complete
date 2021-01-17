package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"grgc/server/internal/model"
	"grgc/server/internal/storage"
	"grgc/server/pb"
)

// AuthService is the service for authentication
type AuthService struct {
	jwtManager  *JWTManager
	userStorage storage.UserStorage
	pb.UnimplementedAuthServiceServer
}

// NewAuthService returns a new auth server
func NewAuthService(jwtManager *JWTManager, userStorage storage.UserStorage) *AuthService {
	return &AuthService{
		jwtManager:  jwtManager,
		userStorage: userStorage,
	}
}

// Register creates a new user and return with credentials
func (service *AuthService) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {

	user := &model.User{
		Username: req.GetUsername(),
		Password: req.GetPassword(),
		Email:    req.GetEmail(),
	}

	user.HashPassword()

	err := service.userStorage.Create(user)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot create user: %v", err)
	}

	accessToken, err := service.jwtManager.Generate(user.ID, service.jwtManager.accessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	refreshToken, err := service.jwtManager.Generate(user.ID, service.jwtManager.refreshTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate refresh token")
	}

	res := &pb.RegisterResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		UserId:       user.ID,
	}
	return res, nil
}

// Login is a call to login user
func (service *AuthService) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {

	user, err := service.userStorage.GetByUsername(req.GetUsername())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot find user: %v", err)
	}

	if user == nil || !user.CheckPassword(req.GetPassword()) {
		return nil, status.Errorf(codes.NotFound, "incorrect username/password")
	}

	accessToken, err := service.jwtManager.Generate(user.ID, service.jwtManager.accessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	refreshToken, err := service.jwtManager.Generate(user.ID, service.jwtManager.refreshTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate refresh token")
	}

	res := &pb.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		UserId:       user.ID,
	}
	return res, nil
}

// Refresh is a call to refresh user access token
func (service *AuthService) Refresh(ctx context.Context, req *pb.RefreshRequest) (*pb.RefreshResponse, error) {
	userClaims, err := service.jwtManager.Verify(req.RefreshToken)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "refresh token is invalid: %v", err)
	}

	if userClaims.UserId == 0 {
		return nil, status.Errorf(codes.Unauthenticated, "refresh token is invalid: missing claims")
	}

	accessToken, err := service.jwtManager.Generate(userClaims.UserId, service.jwtManager.accessTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate access token")
	}

	refreshToken, err := service.jwtManager.Generate(userClaims.UserId, service.jwtManager.refreshTokenDuration)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot generate refresh token")
	}

	res := &pb.RefreshResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		UserId:       userClaims.UserId,
	}
	return res, nil
}
