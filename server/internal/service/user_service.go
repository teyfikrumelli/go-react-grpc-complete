package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"grgc/server/internal/storage"
	"grgc/server/pb"
)

// UserService is the service for user operations
type UserService struct {
	jwtManager  *JWTManager
	userStorage storage.UserStorage
	pb.UnimplementedUserServiceServer
}

// NewAuthService returns a new user server
func NewUserService(jwtManager *JWTManager, userStorage storage.UserStorage) *UserService {
	return &UserService{
		jwtManager:  jwtManager,
		userStorage: userStorage,
	}
}

// GetUser returns user details
func (service *UserService) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {

	user, err := service.userStorage.GetByUserId(req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "cannot get user: %v", err)
	}

	res := &pb.GetUserResponse{
		UserId:   user.ID,
		Username: user.Username,
		Email:    user.Email,
	}
	return res, nil
}
