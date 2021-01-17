--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.19
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: grgc_pg_db; Type: DATABASE; Schema: -; Owner: grgc_pg_user
--

SELECT 'CREATE DATABASE grgc_pg_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'grgc_pg_db')\gexec

ALTER DATABASE grgc_pg_db OWNER TO grgc_pg_user;

\connect grgc_pg_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: user; Type: TABLE; Schema: public; Owner: grgc_pg_user
--

CREATE TABLE public.user (
                              id integer NOT NULL,
                              created_at timestamp with time zone,
                              updated_at timestamp with time zone,
                              deleted_at timestamp with time zone,
                              username text NOT NULL,
                              email text NOT NULL,
                              password text,
                              role text
);


ALTER TABLE public.user OWNER TO grgc_pg_user;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: grgc_pg_user
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO grgc_pg_user;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grgc_pg_user
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: grgc_pg_user
--

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: grgc_pg_user
--

COPY public.user (id, created_at, updated_at, deleted_at, username, password, role) FROM stdin;
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grgc_pg_user
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: grgc_pg_user
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: idx_user_deleted_at; Type: INDEX; Schema: public; Owner: grgc_pg_user
--

CREATE INDEX idx_user_deleted_at ON public.user USING btree (deleted_at);


--
-- Name: user_email_uindex; Type: INDEX; Schema: public; Owner: grgc_pg_user
--


CREATE UNIQUE INDEX user_email_uindex ON public.user USING btree (email);


--
-- Name: user_username_uindex; Type: INDEX; Schema: public; Owner: grgc_pg_user
--

CREATE UNIQUE INDEX user_username_uindex ON public.user USING btree (username);

