package postgres

import (
	"database/sql"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/go-test/deep"
	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"grgc/server/internal/model"
	"grgc/server/internal/storage"
	"regexp"
	"testing"
	"time"
)

type Suite struct {
	suite.Suite
	DB   *gorm.DB
	mock sqlmock.Sqlmock

	Storage storage.Storage
}

func (s *Suite) SetupSuite() {
	var (
		db  *sql.DB
		err error
	)

	db, s.mock, err = sqlmock.New()
	require.NoError(s.T(), err)

	s.DB, err = gorm.Open("postgres", db)
	require.NoError(s.T(), err)

	s.DB.LogMode(true)

	s.Storage = NewPostgres(s.DB)
}

func (s *Suite) AfterTest(_, _ string) {
	require.NoError(s.T(), s.mock.ExpectationsWereMet())
}

func TestInit(t *testing.T) {
	suite.Run(t, new(Suite))
}

func (s *Suite) TestUserCreate() {
	var (
		username = "test-username"
	)

	const newUserID = 1

	user := &model.User{
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		DeletedAt: nil,
		Username:  username,
	}

	user.HashPassword()

	s.mock.ExpectBegin()
	s.mock.ExpectQuery(regexp.QuoteMeta(
		`INSERT INTO "users" ("created_at","updated_at","deleted_at","username","email","password") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "users"."id"`,
	)).
		WithArgs(user.CreatedAt, user.UpdatedAt, user.DeletedAt, user.Username, user.Email, user.Password).
		WillReturnRows(
			sqlmock.NewRows([]string{"id"}).AddRow(newUserID))
	s.mock.ExpectCommit()

	err := s.Storage.User().Create(user)
	require.NoError(s.T(), err)
}

func (s *Suite) TestUserGetByUsername() {
	var (
		username = "test-username"
	)

	s.mock.ExpectQuery(regexp.QuoteMeta(
		`SELECT * FROM "users" WHERE "users"."deleted_at" IS NULL AND ((username = $1))`)).
		WithArgs(username).
		WillReturnRows(sqlmock.NewRows([]string{"username"}).
			AddRow(username))

	res, err := s.Storage.User().GetByUsername(username)

	require.NoError(s.T(), err)
	require.Nil(s.T(), deep.Equal(&model.User{
		Username: username,
	}, res))
}

func (s *Suite) TestUserGetByUserId() {
	var (
		userId = uint32(1)
	)

	s.mock.ExpectQuery(regexp.QuoteMeta(
		`SELECT * FROM "users" WHERE "users"."deleted_at" IS NULL AND ((id = $1))`)).
		WithArgs(userId).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).
			AddRow(userId))

	res, err := s.Storage.User().GetByUserId(userId)

	require.NoError(s.T(), err)
	require.Nil(s.T(), deep.Equal(&model.User{
		ID: userId,
	}, res))
}

func (s *Suite) TestGetDB() {

	db, _, err := sqlmock.New()
	require.NoError(s.T(), err)

	testDB := GetDB(db)
	require.NotNil(s.T(), testDB)
}
