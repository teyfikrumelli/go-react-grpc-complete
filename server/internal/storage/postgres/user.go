package postgres

import (
	"github.com/jinzhu/gorm"
	"grgc/server/internal/model"
)

// UserStorage provides access to postgres db for user data
type UserStorage struct {
	db        *gorm.DB
	tableName string
}

// NewUserStorage creates new UserStorage instance
func NewUserStorage(db *gorm.DB, tableName string) *UserStorage {
	return &UserStorage{
		db:        db,
		tableName: tableName,
	}
}

// Create creates new user
func (u *UserStorage) Create(user *model.User) error {
	return u.db.Table(u.tableName).Create(user).Error
}

// GetByUsername returns user filtered by username
func (u *UserStorage) GetByUsername(username string) (*model.User, error) {

	user := &model.User{}
	err := u.db.Table(u.tableName).Where("username = ?", username).First(user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetByUserId returns user filtered by user id
func (u *UserStorage) GetByUserId(userId uint32) (*model.User, error) {

	user := &model.User{}
	err := u.db.Table(u.tableName).Where("id = ?", userId).First(user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
