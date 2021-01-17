// Package storage implements database related functions
package storage

import "grgc/server/internal/model"

// Storage is the interface for handling database access
type Storage interface {
	User() UserStorage
}

type UserStorage interface {
	// Create saves a new user to the store
	Create(user *model.User) error

	// GetByUsername finds a user by username
	GetByUsername(username string) (*model.User, error)

	// GetByUserId finds a user by user id
	GetByUserId(userId uint32) (*model.User, error)
}
