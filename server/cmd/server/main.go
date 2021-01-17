package main

import (
	"flag"
	"fmt"
	"grgc/server/internal/server"
	"log"
	"net"
)

func main() {
	port := flag.Int("port", 8080, "the server port")
	flag.Parse()
	log.Printf("start server on port %d", *port)

	grpcServer := server.NewServer()

	address := fmt.Sprintf("0.0.0.0:%d", *port)
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatal("cannot start server: ", err)
	}

	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("cannot start server: ", err)
	}
}
