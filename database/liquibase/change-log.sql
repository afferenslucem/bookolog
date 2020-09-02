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

-- changeset hrodvitnir:2 splitStatements:false
create or replace function "createBook" 
(book_guid uuid, name text, authors varchar(256)[], year integer, status integer, tags varchar(256)[],
doneUnits integer, totalUnits integer, genre varchar(256), startDate date, modifyDate timestamp without time zone,
endDate date, type integer, note text, userId integer) returns uuid as $$
    declare result uuid;
    begin
        insert into books(guid, name, authors, year, status, tags, doneunits, totalunits, genre, startdate, modifydate, enddate, type, note, userid)
            values(book_guid, name, authors, year, status, tags, doneUnits, totalUnits, genre, startDate, modifydate, endDate, type, note, userId) returning guid into result;

            return result;
            end
$$ language plpgsql;

create or replace function default_guid() returns trigger as $$
    begin       
        if (new.guid is null) then
            new.guid := uuid_generate_v4();
        end if;
        return new;
    end;
$$ language plpgsql;

create trigger default_guid
before insert on books
    for each row execute procedure default_guid();

-- changeset hrodvitnir:3 splitStatements:false
create or replace function "updateBook" 
(bookGuid uuid, bookName text, bookAuthors varchar(256)[], bookYear integer, bookStatus integer, bookTags varchar(256)[],
bookDoneUnits integer, bookTotalUnits integer, bookGenre varchar(256), bookStartDate date, bookModifyDate timestamp without time zone,
bookEndDate date, bookType integer, bookNote text, bookUserId integer) returns void as $$
    begin
		update books 
			set name = bookName,
				authors = bookAuthors,
				year = bookYear,
				status = bookStatus,
				tags = bookTags,
				doneUnits = bookDoneUnits,
				totalUnits = bookTotalUnits,
				genre = bookGenre,
				startDate = bookStartDate,
				modifyDate = bookModifyDate,
				endDate = bookEndDate,
				type = bookType,
				note = bookNote,
				userId = bookUserId
				where guid = bookGuid;
	end
$$ language plpgsql;