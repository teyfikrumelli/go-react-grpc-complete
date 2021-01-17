FROM golang:1.13 as builder

WORKDIR /app

COPY /go.mod /app
COPY /go.sum /app

RUN go mod download

COPY /build/dev/.air.conf /app

RUN go get github.com/cosmtrek/air

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD air -c .air.conf