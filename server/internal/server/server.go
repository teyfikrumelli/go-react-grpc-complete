package server

import (
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"grgc/server/internal/service"
	"grgc/server/internal/storage/postgres"
	"grgc/server/pb"
	"log"
	"os"
	"time"
)

const (
	secretKey            = "secret"
	accessTokenDuration  = 15 * time.Minute
	refreshTokenDuration = 7 * 24 * time.Hour
)

// NewServer create new grpc server instance
func NewServer() *grpc.Server {

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err.Error())
	}

	storage := postgres.NewPostgres(postgres.GetDB(os.Getenv("DATABASE_URL")))

	jwtManager := service.NewJWTManager(secretKey, accessTokenDuration, refreshTokenDuration)
	interceptor := service.NewAuthInterceptor(jwtManager)

	serverOptions := []grpc.ServerOption{
		grpc.UnaryInterceptor(interceptor.Unary()),
	}

	authService := service.NewAuthService(jwtManager, storage.User())
	userService := service.NewUserService(jwtManager, storage.User())

	grpcServer := grpc.NewServer(serverOptions...)
	pb.RegisterAuthServiceServer(grpcServer, authService)
	pb.RegisterUserServiceServer(grpcServer, userService)

	return grpcServer
}
