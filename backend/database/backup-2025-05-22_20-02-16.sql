--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clientes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.clientes OWNER TO admin;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_seq OWNER TO admin;

--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: consultor_clientes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.consultor_clientes (
    consultor_id integer NOT NULL,
    cliente_id integer NOT NULL
);


ALTER TABLE public.consultor_clientes OWNER TO admin;

--
-- Name: consultores; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.consultores (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.consultores OWNER TO admin;

--
-- Name: consultores_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.consultores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultores_id_seq OWNER TO admin;

--
-- Name: consultores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.consultores_id_seq OWNED BY public.consultores.id;


--
-- Name: holding_socios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.holding_socios (
    holding_id integer NOT NULL,
    cliente_id integer NOT NULL,
    percentual_participacao numeric(5,2),
    tipo_socio character varying(50)
);


ALTER TABLE public.holding_socios OWNER TO admin;

--
-- Name: holdings; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.holdings (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cnpj character varying(20),
    consultor_id integer NOT NULL,
    data_constituicao date
);


ALTER TABLE public.holdings OWNER TO admin;

--
-- Name: holdings_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.holdings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.holdings_id_seq OWNER TO admin;

--
-- Name: holdings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.holdings_id_seq OWNED BY public.holdings.id;


--
-- Name: patrimonios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.patrimonios (
    id integer NOT NULL,
    cliente_id integer,
    categoria text NOT NULL,
    valor numeric(12,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.patrimonios OWNER TO admin;

--
-- Name: patrimonios_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.patrimonios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patrimonios_id_seq OWNER TO admin;

--
-- Name: patrimonios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.patrimonios_id_seq OWNED BY public.patrimonios.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    user_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: consultores id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultores ALTER COLUMN id SET DEFAULT nextval('public.consultores_id_seq'::regclass);


--
-- Name: holdings id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holdings ALTER COLUMN id SET DEFAULT nextval('public.holdings_id_seq'::regclass);


--
-- Name: patrimonios id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patrimonios ALTER COLUMN id SET DEFAULT nextval('public.patrimonios_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clientes (id, user_id) FROM stdin;
1	1
\.


--
-- Data for Name: consultor_clientes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.consultor_clientes (consultor_id, cliente_id) FROM stdin;
\.


--
-- Data for Name: consultores; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.consultores (id, user_id) FROM stdin;
\.


--
-- Data for Name: holding_socios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.holding_socios (holding_id, cliente_id, percentual_participacao, tipo_socio) FROM stdin;
\.


--
-- Data for Name: holdings; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.holdings (id, nome, cnpj, consultor_id, data_constituicao) FROM stdin;
\.


--
-- Data for Name: patrimonios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.patrimonios (id, cliente_id, categoria, valor, created_at) FROM stdin;
1	1	imóveis	700000.00	2025-05-22 21:16:10.545816
2	1	ações	250000.00	2025-05-22 21:16:32.223975
3	1	Outros	100000.00	2025-05-22 21:17:50.383303
4	1	Carro de luxo	1000000.00	2025-05-22 21:18:06.111462
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, email, password, user_type, created_at) FROM stdin;
1	Danilo	danilo@123	$2b$10$blgpxYAjJmmN3dwima/ao.PYvChBXz4oVVkMqxkFswNn2MqUNUh3m	client	2025-05-22 10:28:04.408546
\.


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, true);


--
-- Name: consultores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.consultores_id_seq', 1, false);


--
-- Name: holdings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.holdings_id_seq', 1, false);


--
-- Name: patrimonios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.patrimonios_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_user_id_key UNIQUE (user_id);


--
-- Name: consultor_clientes consultor_clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultor_clientes
    ADD CONSTRAINT consultor_clientes_pkey PRIMARY KEY (consultor_id, cliente_id);


--
-- Name: consultores consultores_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultores
    ADD CONSTRAINT consultores_pkey PRIMARY KEY (id);


--
-- Name: consultores consultores_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultores
    ADD CONSTRAINT consultores_user_id_key UNIQUE (user_id);


--
-- Name: holding_socios holding_socios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holding_socios
    ADD CONSTRAINT holding_socios_pkey PRIMARY KEY (holding_id, cliente_id);


--
-- Name: holdings holdings_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_cnpj_key UNIQUE (cnpj);


--
-- Name: holdings holdings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_pkey PRIMARY KEY (id);


--
-- Name: patrimonios patrimonios_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patrimonios
    ADD CONSTRAINT patrimonios_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: consultor_clientes consultor_clientes_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultor_clientes
    ADD CONSTRAINT consultor_clientes_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE CASCADE;


--
-- Name: consultor_clientes consultor_clientes_consultor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultor_clientes
    ADD CONSTRAINT consultor_clientes_consultor_id_fkey FOREIGN KEY (consultor_id) REFERENCES public.consultores(id) ON DELETE CASCADE;


--
-- Name: consultores consultores_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consultores
    ADD CONSTRAINT consultores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: holding_socios holding_socios_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holding_socios
    ADD CONSTRAINT holding_socios_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE CASCADE;


--
-- Name: holding_socios holding_socios_holding_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holding_socios
    ADD CONSTRAINT holding_socios_holding_id_fkey FOREIGN KEY (holding_id) REFERENCES public.holdings(id) ON DELETE CASCADE;


--
-- Name: holdings holdings_consultor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_consultor_id_fkey FOREIGN KEY (consultor_id) REFERENCES public.consultores(id) ON DELETE SET NULL;


--
-- Name: patrimonios patrimonios_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patrimonios
    ADD CONSTRAINT patrimonios_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

