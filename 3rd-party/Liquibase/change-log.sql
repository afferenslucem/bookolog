--liquibase formatted sql

-- changeset hrodvitnir:1 splitStatements:false
create table users (
	id integer primary key asc,
	login text not null,
	password_hash text not null,
	salt text not null
);

create unique index unqe_users_login on users(login);

-- changeset hrodvitnir:2 splitStatements:false

create table books (
	id integer primary key asc,
	name text not null,
	authors text not null,
	status integer not null,
	startDate blob,
	endDate blob,
	pages integer,
	totalPages integer,
	userId integer not null,
	FOREIGN KEY(userId) REFERENCES users(id)
);

-- changeset hrodvitnir:3 splitStatements:false
insert into users(login, password_hash, salt) values ('admin', '587eacbcd7cf434707a49d58bd8c5715d186b2a6120763f2bf735cb1bd61426e', '123');