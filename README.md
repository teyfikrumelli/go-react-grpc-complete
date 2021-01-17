# Go React gRPC Complete

A complete full stack gRPC project shortened as *grgc*.

This project aims to help developers to start their new gRPC web project with one command.

Both client and server side have live reload to make development faster.

### Tech Stack

###### Backend
- Go
- gRPC & Protocol Buffers
- Postgres

###### Frontend
- React (Redux & Hooks)
- gRPC-web
- Ant Design

### Requirements
- docker-compose (only requirement to run project)
- protoc | plugins: grpc-go, grpc-web

### Development

To run:

```sh
$ make dev-run
```

Then open [http://localhost:3000/](http://localhost:3000/) to see app.

To generate source code from proto files:

```sh
$ make gen
```

### TODO

- Improve error handling on both server and client side
- Add more tests
- Add a sample streaming feature
- Dockerize code generation from proto files
- Add config support to remove constants in server app