--liquibase formatted sql

-- changeset hrodvitnir:1 splitStatements:false
create table users (
	id serial primary key,
	login text not null unique,
	email text not null unique,
	passwordHash text not null,
	salt text not null,
	lastAction timestamp without time zone
);

create table books (
	guid uuid default uuid_generate_v4 () primary key,
	name varchar(512) not null,
	authors varchar(256)[],
    year integer default null,
    status integer default 0,
	tags varchar(256)[],
	totalUnits integer default 0,
	doneUnits integer default 0,
	genre varchar(256),
	startDate date,
	modifyDate timestamp without time zone,
	endDate date,
	type integer default 0,
	note text,
	userId integer references users (id),
	constraint validDates check (startDate <= endDate),
	constraint validUnits check (doneUnits <= totalUnits)
);