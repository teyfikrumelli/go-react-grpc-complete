package model

import (
	"golang.org/x/crypto/bcrypt"
	"time"
)

type User struct {
	ID        uint32 `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
	Username  string     `json:"username" gorm:"unique;not null"`
	Email     string     `json:"email" gorm:"unique;not null"`
	Password  string     `json:"password,omitempty"`
}

// HashPassword hashes user password
func (user *User) HashPassword() {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)
}

// CheckPassword checks if the provided password is correct or not
func (user *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}
