package postgres

import (
	"grgc/server/internal/model"
	"grgc/server/internal/storage"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

const (
	userTableName = "users"
)

// Postgres is storage instance for postgres db
type Postgres struct {
	userStorage *UserStorage
}

// NewPostgres returns a new postgres db store
func NewPostgres(db *gorm.DB) storage.Storage {

	return &Postgres{
		userStorage: NewUserStorage(db, userTableName),
	}
}

// User returns active UserStorage
func (p *Postgres) User() storage.UserStorage {
	return storage.UserStorage(p.userStorage)
}

// GetDB returns postgres db instance
func GetDB(args interface{}) *gorm.DB {

	db, err := gorm.Open("postgres", args)
	if err != nil {
		log.Fatal("could not connect db, err: ", err.Error())
	}

	db.Debug().AutoMigrate(&model.User{})

	return db
}
