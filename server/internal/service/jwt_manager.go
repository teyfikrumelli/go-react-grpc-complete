package service

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// JWTManager is a JSON web token manager
type JWTManager struct {
	secretKey            string
	accessTokenDuration  time.Duration
	refreshTokenDuration time.Duration
}

// UserClaims is a custom JWT claims that contains some user's information
type UserClaims struct {
	jwt.StandardClaims
	UserId uint32 `json:"userId"`
}

// NewJWTManager returns a new JWT manager
func NewJWTManager(secretKey string, accessTokenDuration time.Duration, refreshTokenDuration time.Duration) *JWTManager {
	return &JWTManager{secretKey, accessTokenDuration, refreshTokenDuration}
}

// Generate generates and signs a new token for a user
func (manager *JWTManager) Generate(userId uint32, duration time.Duration) (string, error) {
	claims := UserClaims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(duration).Unix(),
		},
		UserId: userId,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(manager.secretKey))
}

// Verify verifies the access token string and return a user claim if the token is valid
func (manager *JWTManager) Verify(accessToken string) (*UserClaims, error) {
	token, err := jwt.ParseWithClaims(
		accessToken,
		&UserClaims{},
		func(token *jwt.Token) (interface{}, error) {
			_, ok := token.Method.(*jwt.SigningMethodHMAC)
			if !ok {
				return nil, fmt.Errorf("unexpected token signing method")
			}

			return []byte(manager.secretKey), nil
		},
	)

	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	claims, ok := token.Claims.(*UserClaims)
	if !ok {
		return nil, fmt.Errorf("invalid token claims")
	}

	return claims, nil
}
