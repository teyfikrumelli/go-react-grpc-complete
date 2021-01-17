MAKEFLAGS += --no-print-directory

POSTGRES_USER ?= grgc_pg_user
POSTGRES_PASSWORD ?= grgc_pg_pwd
POSTGRES_HOST ?= grgc-pg
POSTGRES_PORT ?= 5432
POSTGRES_DB ?= grgc_pg_db
POSTGRES_URL ?= ${POSTGRES_HOST}:${POSTGRES_PORT}

DATABASE_URL ?= postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=disable

dev-run: dev-gen-env## Runs
	docker-compose build && docker-compose up

dev-gen-env: ## Update .env file. Useful for using docker-compose in terminal
	@echo "POSTGRES_URL=$(POSTGRES_URL)" > .env
	@echo "POSTGRES_USER=$(POSTGRES_USER)" >> .env
	@echo "POSTGRES_PASSWORD=$(POSTGRES_PASSWORD)" >> .env
	@echo "POSTGRES_DB=$(POSTGRES_DB)" >> .env
	@echo "DATABASE_URL=$(DATABASE_URL)" >> .env

gen:
	protoc --go_out=server/pb \
			--go-grpc_out=server/pb \
			--js_out=import_style=commonjs,binary:client/src/pb \
			--grpc-web_out=import_style=commonjs,mode=grpcwebtext:client/src/pb \
			-I proto proto/*.proto

clean:
	rm server/pb/*.go
	rm client/src/pb/*.js

test:
	go test -cover -race ./...

.PHONY: gen clean test 
