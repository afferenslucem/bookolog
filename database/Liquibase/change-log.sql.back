--liquibase formatted sql

-- changeset hrodvitnir:1 splitStatements:false


create type project as
(
  "Id" integer,
  "AsanaGuid" varchar(128),
  "Name" varchar(256),
  "ShortName" varchar(128),
  "LastTaskNumber" integer
);

create table "Projects"
(
  "Id"           serial       not null
   constraint "PK_Projects"
   primary key,
  "AsanaGuid" varchar(128) not null,
  "Name" varchar(256) not null,
  "ShortName" varchar(128) not null,
  "LastTaskNumber" integer default 0
);

create unique index "IX_Projects_AsanaGuid" on "Projects" ("AsanaGuid");

create type section as
(
  "Id" integer,
  "AsanaGuid" varchar(128),
  "Name" varchar(256),
  "ShortName" varchar (32),
  "SectionType" integer,
  "IsWatched" boolean,
  "ProjectId" integer
);

create table "Sections"
(
  "Id" serial not null
   constraint "PK_Sections"
   primary key,
  "AsanaGuid" varchar(128)  not null,
  "Name" varchar(256) not null,
  "ShortName" varchar (32),
  "SectionType" integer not null,
  "IsWatched" boolean not null,
  "ProjectId" integer not null
   constraint "FK_Sections_Projects_ProjectId"
   references "Projects"
   on delete cascade
);

create unique index "IX_Sections_AsanaGuid" on "Sections" ("AsanaGuid");

create type task as
(
  "Id" integer,
  "AsanaGuid" varchar(128),
  "Name" varchar(512),
  "Description" varchar(2048),
  "Completed" boolean,
  "CompletedAt" timestamp,
  "CompletedBy" varchar(512),
  "CreatedAt" timestamp,
  "DueOn" timestamp,
  "ProjectTaskId" varchar(128),
  "SectionId" integer,
  "Priority" int,
  "Assignee" varchar(512),
  "BranchIgnore" boolean,
  "Archived" boolean,
  "Deleted" boolean,
  "ModifyTime" timestamp
);

create table "Tasks"
(
  "Id"   serial       		not null
   constraint "PK_Tasks"
   primary key,
  "AsanaGuid" varchar(128) not null,
  "Name" varchar(512) not null,
  "Description" varchar(2048),
  "Completed" boolean not null default false,
  "CompletedAt" timestamp,
  "CompletedBy" varchar(512),
  "CreatedAt" timestamp,
  "DueOn" timestamp,
  "ProjectTaskId" varchar(128),
  "SectionId" integer not null
   constraint "FK_Tasks_Sections_SectionId"
   references "Sections"
   on delete cascade,
  "Priority" int default 1,
  "Assignee" varchar(512),
  "BranchIgnore" boolean not null,
  "Archived" boolean not null default false,
  "Deleted" boolean not null default false,
  "ModifyTime" timestamp
);

create unique index "IX_Tasks_AsanaGuid" on "Tasks" ("AsanaGuid");

create type branch as (
  "Id" integer,
  "Name" varchar(128),
  "TaskId" integer
);

create table "Branches"
(
  "Id"   serial       		not null
   constraint "PK_Branches"
   primary key,
  "Name" varchar(128) not null,
  "TaskId" integer not null
   constraint "FK_Branches_Tasks_TaskId"
   references "Tasks"
   on delete cascade
);

create unique index "IX_Branches_Name" on "Branches" ("Name");

create table "TaskHistory"
(
	"Id"   serial       		not null
	constraint "PK_TaskHistory"
	primary key,
	"AsanaGuid" varchar(128) not null,
	"Name" varchar(512) not null,
  "Description" varchar(2048),
	"Completed" boolean default false,
	"CompletedAt" timestamp,
	"CompletedBy" varchar(512),
	"CreatedAt" timestamp,
	"DueOn" timestamp,
	"ProjectTaskId" varchar(128),
	"SectionId" integer not null
	constraint "FK_Tasks_Sections_SectionId"
	references "Sections"
	on delete cascade,
	"Priority" int default 1,
	"Assignee" varchar(512),
	"BranchIgnore" boolean not null,
	"Archived" boolean not null default false,
	"Deleted" boolean default false,
	"ModifyTime" timestamp,
	"TaskId" integer not null
	constraint "FK_TaskHistory_Tasks_TaskId"
	references "Tasks"
	on delete cascade,
	"DBModifyTime" timestamp not null
   );

create or replace function "LogTaskChanges"() returns trigger language plpgsql as $$
begin
  insert into "TaskHistory"("AsanaGuid", "Name", "Description", "Completed", "CompletedAt", "CompletedBy", "CreatedAt", "DueOn", "ProjectTaskId", "SectionId", "Priority", "Assignee", "BranchIgnore", "Archived", "Deleted", "ModifyTime", "TaskId", "DBModifyTime")
    values (new."AsanaGuid", new."Name", new."Description", new."Completed", new."CompletedAt", new."CompletedBy", new."CreatedAt", new."DueOn", new."ProjectTaskId", new."SectionId", new."Priority", new."Assignee", new."BranchIgnore", new."Archived", new."Deleted", new."ModifyTime", new."Id", now());
  return new;
end;
$$;

create trigger "TasksLogTrigger" after insert or update on "Tasks" for row execute procedure "LogTaskChanges"();

create or replace view "ActualTasks" as select * from "Tasks" where "Deleted" = false;

create or replace view "TaskProject" as select "ActualTasks".*, "Sections"."ProjectId" from "ActualTasks" inner join "Sections" on "ActualTasks"."SectionId" = "Sections"."Id";

create or replace view "TaskProjectAnarchived" as select * from "TaskProject" where "Archived" = false;

create or replace function "UpsertTasks"(tasks task[]) returns task[] language plpgsql as $$
  declare result task[];
  declare item task;
  declare returningId integer;
begin
  foreach item in array tasks
    loop
      if not exists(select * from "Tasks" where "AsanaGuid" = item."AsanaGuid") then 
        begin
          insert into "Tasks"("AsanaGuid", "Name", "Description", "Completed", "CompletedAt", "CompletedBy", "CreatedAt", "DueOn",
           "ProjectTaskId", "SectionId", "Priority", "Assignee", "BranchIgnore", "Archived", "Deleted", "ModifyTime") values
          (item."AsanaGuid", item."Name", item."Description", item."Completed", item."CompletedAt", item."CompletedBy", item."CreatedAt",
           item."DueOn", item."ProjectTaskId", item."SectionId", item."Priority", item."Assignee", item."BranchIgnore", item."Archived",
           item."Deleted", item."ModifyTime") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          update "Tasks" set
            "Name" = item."Name",
            "Description" = item."Description",
            "Completed" = item."Completed",
            "CompletedAt" = item."CompletedAt",
            "CompletedBy" = item."CompletedBy",
            "CreatedAt" = item."CreatedAt",
            "DueOn" = item."DueOn",
            "ProjectTaskId" = item."ProjectTaskId",
            "SectionId" = item."SectionId",
            "Priority" = item."Priority",
            "Assignee" = item."Assignee",
            "BranchIgnore" = item."BranchIgnore",
            "Archived" = item."Archived",
            "Deleted" = item."Deleted",
            "ModifyTime" = item."ModifyTime" where "AsanaGuid" = item."AsanaGuid";
        end;
       end if;
    end loop;
  return result;
 end;
$$;

create or replace function "UpsertTasks"(tasks task[]) returns task[] language plpgsql as $$
  declare result task[];
  declare item task;
  declare returningId integer;
begin
  foreach item in array tasks
    loop
      if not exists(select * from "Tasks" where "AsanaGuid" = item."AsanaGuid") then 
        begin
          insert into "Tasks"("AsanaGuid", "Name", "Description", "Completed", "CompletedAt", "CompletedBy", "CreatedAt", "DueOn",
           "ProjectTaskId", "SectionId", "Priority", "Assignee", "BranchIgnore", "Archived", "Deleted", "ModifyTime") values
          (item."AsanaGuid", item."Name", item."Description", item."Completed", item."CompletedAt", item."CompletedBy", item."CreatedAt",
           item."DueOn", item."ProjectTaskId", item."SectionId", item."Priority", item."Assignee", item."BranchIgnore", item."Archived",
           item."Deleted", item."ModifyTime") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          update "Tasks" set
            "Name" = item."Name",
            "Description" = item."Description",
            "Completed" = item."Completed",
            "CompletedAt" = item."CompletedAt",
            "CompletedBy" = item."CompletedBy",
            "CreatedAt" = item."CreatedAt",
            "DueOn" = item."DueOn",
            "ProjectTaskId" = item."ProjectTaskId",
            "SectionId" = item."SectionId",
            "Priority" = item."Priority",
            "Assignee" = item."Assignee",
            "BranchIgnore" = item."BranchIgnore",
            "Archived" = item."Archived",
            "Deleted" = item."Deleted",
            "ModifyTime" = item."ModifyTime" where "AsanaGuid" = item."AsanaGuid";
        end;
       end if;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertTasks"(tasks task[]) returns task[] language plpgsql as $$
  declare result task[];
  declare item task;
  declare returningId integer;
begin
  foreach item in array tasks
    loop
      insert into "Tasks"("AsanaGuid", "Name", "Description", "Completed", "CompletedAt", "CompletedBy", "CreatedAt", "DueOn",
       "ProjectTaskId", "SectionId", "Priority", "Assignee", "BranchIgnore", "Archived", "Deleted", "ModifyTime") values
      (item."AsanaGuid", item."Name", item."Description", item."Completed", item."CompletedAt", item."CompletedBy", item."CreatedAt",
       item."DueOn", item."ProjectTaskId", item."SectionId", item."Priority", item."Assignee", item."BranchIgnore", item."Archived",
       item."Deleted", item."ModifyTime") returning "Id" into returningId;

      item."Id" := returningId;
      select array_append(result, item) into result;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertTasksOrSelect"(tasks task[]) returns task[] language plpgsql as $$
  declare result task[];
  declare item task;
  declare buffer task;
  declare returningId integer;
begin
  foreach item in array tasks
    loop
      if not exists(select * from "Tasks" where "AsanaGuid" = item."AsanaGuid") then
        begin
          insert into "Tasks"("AsanaGuid", "Name", "Description", "Completed", "CompletedAt", "CompletedBy", "CreatedAt", "DueOn",
           "ProjectTaskId", "SectionId", "Priority", "Assignee", "BranchIgnore", "Archived", "Deleted", "ModifyTime") values
          (item."AsanaGuid", item."Name", item."Description", item."Completed", item."CompletedAt", item."CompletedBy", item."CreatedAt",
           item."DueOn", item."ProjectTaskId", item."SectionId", item."Priority", item."Assignee", item."BranchIgnore", item."Archived",
           item."Deleted", item."ModifyTime") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
      	begin
          select * from "Tasks" where "AsanaGuid" = item."AsanaGuid" into buffer;
          select array_append(result, buffer) into result;
      	end;
      end if;
    end loop;
  return result;
 end;
$$;

create or replace function "UpdateTasks"(tasks task[]) returns void language plpgsql as $$
  declare item task;
begin
  foreach item in array tasks
    loop
      update "Tasks" set
            "Name" = item."Name",
            "Description" = item."Description",
            "Completed" = item."Completed",
            "CompletedAt" = item."CompletedAt",
            "CompletedBy" = item."CompletedBy",
            "CreatedAt" = item."CreatedAt",
            "DueOn" = item."DueOn",
            "ProjectTaskId" = item."ProjectTaskId",
            "SectionId" = item."SectionId",
            "Priority" = item."Priority",
            "Assignee" = item."Assignee",
            "BranchIgnore" = item."BranchIgnore",
            "Archived" = item."Archived",
            "Deleted" = item."Deleted",
            "ModifyTime" = item."ModifyTime" where "Id" = item."Id";
    end loop;
 end;
$$;

create or replace function "GetUnexistingTasks"(tasks task[]) returns task[] language plpgsql as $$
  declare result task[];
  declare item task;
  declare returningId integer;
begin
  foreach item in array tasks
    loop
      if not exists(select * from "Tasks" where "AsanaGuid" = item."AsanaGuid") then
        begin          
          select array_append(result, item) into result;
        end;
      end if;
    end loop;
  return result;
 end;
$$;

create or replace function "UpsertSections"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      if not exists(select * from "Sections" where "AsanaGuid" = item."AsanaGuid") then 
        begin
          insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          update "Sections" set
            "Name" = item."Name",
            "ShortName" = item."ShortName",
            "SectionType" = item."SectionType",
            "IsWatched" = item."IsWatched",
            "ProjectId" = item."ProjectId" 
            where "AsanaGuid" = item."AsanaGuid";
        end;
       end if;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertSectionsOrSelect"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare buffer section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      if not exists(select * from "Sections" where "AsanaGuid" = item."AsanaGuid") then
        begin
          insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
      	begin
          select * from "Sections" where "AsanaGuid" = item."AsanaGuid" into buffer;
          select array_append(result, buffer) into result;
      	end;
      end if;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertSections"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId") returning "Id" into returningId;

      item."Id" := returningId;
      select array_append(result, item) into result;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertProjectsOrSelect"(projects project[]) returns project[] language plpgsql as $$
  declare result project[];
  declare item project;
  declare buffer project;
  declare returningId integer;
begin
  foreach item in array projects
    loop
      if not exists(select * from "Projects" where "AsanaGuid" = item."AsanaGuid") then
        begin
          insert into "Projects"("AsanaGuid", "Name", "ShortName", "LastTaskNumber") values
          (item."AsanaGuid", item."Name", item."ShortName", item."LastTaskNumber") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          select * from "Projects" where "AsanaGuid" = item."AsanaGuid" into buffer;
          select array_append(result, buffer) into result;
        end;
      end if;
    end loop;
  return result;
 end;
$$;

create or replace function "UpsertProjects"(projects project[]) returns project[] language plpgsql as $$
  declare result project[];
  declare item project;
  declare returningId integer;
begin
  foreach item in array projects
    loop
      if not exists(select * from "Projects" where "AsanaGuid" = item."AsanaGuid") then 
        begin
          insert into "Sections"("AsanaGuid", "Name", "ShortName", "LastTaskNumber") values
          (item."AsanaGuid", item."Name", item."ShortName", item."LastTaskNumber") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          update "Projects" set
            "Name" = item."Name",
            "ShortName" = item."ShortName",
            "LastTaskNumber" = item."LastTaskNumber"
             where "AsanaGuid" = item."AsanaGuid";
        end;
       end if;
    end loop;
  return result;
 end;
$$;

create or replace function "UpdateProjects"(projects project[]) returns void language plpgsql as $$
  declare item project;
begin
  foreach item in array projects
    loop
      update "Projects" set
            "Name" = item."Name",
            "ShortName" = item."ShortName",
            "LastTaskNumber" = item."LastTaskNumber"
             where "AsanaGuid" = item."AsanaGuid";
    end loop;
 end;
$$;

create or replace function "InsertBranches"(branches branch[]) returns branch[] language plpgsql as $$
  declare result branch[];
  declare item branch;
  declare returningId integer;
begin
  foreach item in array branches
    loop
      insert into "Branches"("Name", "TaskId") values
          (item."Name", item."TaskId") returning "Id" into returningId;

      item."Id" := returningId;
      select array_append(result, item) into result;
    end loop;
  return result;
 end;
$$;

-- changeset hrodvitnir:2 splitStatements:false

create table "Users" 
(
	"Id" serial not null
	constraint "Pk_Users"
	primary key,
	"Login" varchar(64) not null,
	"PasswordHash" varchar(128) not null,
	"Salt" varchar(128) not null,
	"TelegramId" varchar(128),
	"AsanaGuid" varchar(128),
	"BitbucketUuid" varchar(128)
);

create unique index "IX_Users_Login" on "Users" ("Login");


create type integrator_user as (
	"Id" integer,
	"Login" varchar(64),
	"PasswordHash" varchar(128),
	"Salt" varchar(128),
	"TelegramId" varchar(128),
	"AsanaGuid" varchar(128),
	"BitbucketUuid" varchar(128)
);

create table "Roles" 
(
	"Id" serial not null
	constraint "Pk_Claims"
	primary key,
	"Name" varchar(64) not null
);

create unique index "IX_Roles_Name" on "Roles" ("Name");

insert into "Roles"("Name") values ('Developer');
insert into "Roles"("Name") values ('Deployer');
insert into "Roles"("Name") values ('Tester');
insert into "Roles"("Name") values ('Manager');
insert into "Roles"("Name") values ('Admin');

create type role as 
(
	"Id" integer,
	"Name" varchar(64)
);

create table "UserRole" 
(
	"UserId" integer not null
	constraint "FK_UserRole_Users_UserId"
	references "Users"
	on delete cascade,
	"RoleId" integer not null
	constraint "FK_UserRole_Roles_RoleId"
	references "Roles"
	on delete cascade
);

create unique index "IX_UserRole_UserId_RoleId" on "UserRole" ("UserId", "RoleId");



insert into "Users" ("Login", "PasswordHash", "Salt") values ('admin', 'bb6f1e024336e27c15f449620b70fedc7499ae945927c4e70b1a5479842e202a', '123!@#$');
insert into "Users" ("Login", "PasswordHash", "Salt") values ('teamlead', '39094be38a7f2859a8d828950ffbe845719fb537991aea55d3a2022d2058ed1e', '$#843hgg');
insert into "Users" ("Login", "PasswordHash", "Salt") values ('tester', '70b3263e422922185c4f025220c622f14835d33286004c72c1d9a53a707d6935', '@fc43df');
insert into "Users" ("Login", "PasswordHash", "Salt") values ('deployer', '5261f0e56dfedcc03b6e76a2d04b506aab88c8404fc36e4fc7647076093d3c8c', '@%^FSdfda');
insert into "Users" ("Login", "PasswordHash", "Salt") values ('developer', 'ed4893a6acc894618fcb2fe8e64b69398030e76ebbf4caff2bd68f1c6f1b81a2', '@vfd#@fc');


insert into "UserRole"("UserId", "RoleId") values (1, 5);
insert into "UserRole"("UserId", "RoleId") values (2, 4);
insert into "UserRole"("UserId", "RoleId") values (2, 1);
insert into "UserRole"("UserId", "RoleId") values (3, 3);
insert into "UserRole"("UserId", "RoleId") values (4, 2);
insert into "UserRole"("UserId", "RoleId") values (4, 1);
insert into "UserRole"("UserId", "RoleId") values (5, 1);

create type integrator_user_role as 
(
	"UserId" integer,
	"RoleId" integer
);

create or replace view "UsersWithRoles" as select u.*, ur."Id" as "RoleId", ur."Name" as "RoleName" from (select ur."UserId", r.* from "UserRole" ur inner join "Roles" r on ur."RoleId" = r."Id") as ur
  inner join "Users" u on ur."UserId" = u."Id";

create or replace function "InsertUser"(person integrator_user) returns integrator_user language plpgsql as $$
declare returningId integer;
begin
	insert into "Users"("Login", "PasswordHash", "Salt", "TelegramId", "AsanaGuid", "BitbucketUuid") values(person."Login", person."PasswordHash", person."Salt", person."TelegramId", person."AsanaGuid", person."BitbucketUuid") returning "Id" into returningId;

	person."Id" := returningId;

	return person;
end;
$$;

create or replace function "UpdateUser"(person integrator_user) returns void language plpgsql as $$
begin
	update "Users"
		set
		"Login" = person."Login",
		"PasswordHash" = person."PasswordHash",
		"Salt" = person."Salt",
		"TelegramId" = person."TelegramId",
		"AsanaGuid" = person."AsanaGuid",
		"BitbucketUuid" = person."BitbucketUuid"
		where "Id" = person."Id";
end;
$$;

create or replace function "UpdateUserNonPrivate"(person integrator_user) returns void language plpgsql as $$
begin
	update "Users"
		set
		"Login" = person."Login",
		"TelegramId" = person."TelegramId",
		"AsanaGuid" = person."AsanaGuid",
		"BitbucketUuid" = person."BitbucketUuid"
		where "Id" = person."Id";
end;
$$;

create or replace function "UpdateUserRoles"(id integer, claim_ids integer[]) returns void language plpgsql as $$
	declare item integer;
begin
	delete from "UserRole" where "UserId" = id;

	foreach item in array claim_ids
	loop
		insert into "UserRole"("UserId", "RoleId") values (id, item);
	end loop;
end;
$$;

create or replace function "UpdateUserPassword"(person integrator_user) returns void language plpgsql as $$
begin
	update "Users"
		set
		"PasswordHash" = person."PasswordHash",
		"Salt" = person."Salt"
		where "Id" = person."Id";
end;
$$;

-- changeset hrodvitnir:3 splitStatements:false

create or replace function "InsertUser"(person integrator_user, claim_ids integer[]) returns integrator_user language plpgsql as $$
declare item integrator_user;
begin
	item := "InsertUser"(person);

	perform "UpdateUserRoles"(item."Id", claim_ids);

	return item;
end;
$$;

create or replace function "UpdateUser"(person integrator_user, claim_ids integer[]) returns void language plpgsql as $$
begin
 	perform "UpdateUserNonPrivate"(person);

	perform "UpdateUserRoles"(person."Id", claim_ids);
end;
$$;

-- changeset hrodvitnir:4 splitStatements:false

create type webhook as 
(
  "Id" integer,
  "AsanaGuid" varchar(128),
  "TaskGuid" varchar(128),
  "XHookSecret" varchar(256),
  "CreatedAt" timestamp,
  "Alive" boolean,
  "KilledAt" timestamp,
  "ProjectId" integer
);

create table "Webhooks" 
(
  "Id" serial not null
  constraint "Pk_Webhooks"
  primary key,
  "AsanaGuid" varchar(128),
  "TaskGuid" varchar(128) not null,
  "XHookSecret" varchar(256),
  "CreatedAt" timestamp not null,
  "Alive" boolean not null default false,
  "KilledAt" timestamp,
  "ProjectId" integer not null
  constraint "FK_Webhooks_Projects_Id"
  references "Projects"
  on delete cascade
);

create index "IX_Webhooks_TaskGuid" on "Webhooks" ("TaskGuid");

create or replace function "InsertWebhook"(hook webhook) returns setof "Webhooks" language plpgsql as $$
begin
  return query insert into "Webhooks"("AsanaGuid", "TaskGuid", "XHookSecret", "CreatedAt", "Alive", "KilledAt", "ProjectId") values 
    (hook."AsanaGuid", hook."TaskGuid", hook."XHookSecret", now(), hook."Alive", hook."KilledAt", hook."ProjectId") returning *;
end;
$$;

create or replace function "KillWebhooks"() returns void language plpgsql as $$
begin
  delete from "Webhooks";
end;
$$;

create or replace function "GetAliveWebhooksForProject"(id integer) returns setof "Webhooks" language plpgsql as $$
  begin
    return query select * from "Webhooks" where "ProjectId" = id and "Alive" = true;
  end;
$$;

-- changeset hrodvitnir:5 splitStatements:false

create type team as 
(
  "Id" integer,
  "Name" varchar(128),
  "Description" varchar(2048),
  "TeamleadId" integer
);

create table "Teams" 
(
  "Id" serial not null
  constraint "Pk_Teams"
  primary key,
  "Name" varchar(128) not null,
  "Description" varchar(2048),
  "TeamleadId" integer 
  constraint "FK_Teams_Users_Id"
  references "Users" on delete set null
);

create table "TeamUser"
(
  "UserId" integer not null
  constraint "FK_TeamUser_Users_Id"
  references "Users" on delete cascade,
  "TeamId" integer not null
  constraint "FK_TeamUser_Teams_Id"
  references "Teams" on delete cascade
);

create unique index "IX_TeamUser_UserId_TeamId" on "TeamUser" ("UserId", "TeamId");

-- changeset hrodvitnir:6 splitStatements:false

create or replace function "InsertTeam"(item team) returns team language plpgsql as $$
declare returningId integer;
begin
  insert into "Teams"("Name", "Description", "TeamleadId") values(item."Name", item."Description", item."TeamleadId") returning "Id" into returningId;

  item."Id" := returningId;

  return item;
end;
$$;

create or replace function "UpdateTeam"(item team) returns void language plpgsql as $$
begin
  update "Teams" set
    "Name" = item."Name",
    "Description" = item."Description",
    "TeamleadId" = item."TeamleadId"
    where "Id" = item."Id";
end;
$$;

create or replace view "TeamsWithUsers" 
  as select t."Id", t."Name", t."Description", t."TeamleadId", tu."Id" as "UserId", tu."Login", tu."PasswordHash", tu."Salt", tu."TelegramId", tu."AsanaGuid", tu."BitbucketUuid" 
  from (select tu."TeamId", u.* from "TeamUser" tu inner join "Users" u on tu."UserId" = u."Id") as tu inner join "Teams" t on tu."TeamId" = t."Id";


create or replace function "UpdateTeamUsers"(id integer, user_ids integer[]) returns void language plpgsql as $$
  declare item integer;
begin
  delete from "TeamUser" where "TeamId" = id;

  foreach item in array user_ids
  loop
    insert into "TeamUser"("TeamId", "UserId") values (id, item);
  end loop;
end;
$$;

create or replace function "InsertTeamUsers"(id integer, user_ids integer[]) returns void language plpgsql as $$
  declare item integer;
begin
  foreach item in array user_ids
  loop
    insert into "TeamUser"("TeamId", "UserId") values (id, item);
  end loop;
end;
$$;

create or replace function "DeleteUsersFromTeam"(id integer) returns void language plpgsql as $$
  declare item integer;
begin
  delete from "TeamUser" where "TeamId" = id;
end;
$$;


create or replace function "UpdateTeam"(item team, user_ids integer[]) returns void language plpgsql as $$
begin
  perform "UpdateTeam"(item);
  perform "UpdateTeamUsers"(item."Id", user_ids);
end;
$$;

create or replace function "InsertTeam"(item team, user_ids integer[]) returns team language plpgsql as $$
begin
  item := "InsertTeam"(item);

  perform "InsertTeamUsers"(item."Id", user_ids);

  return item;
end;
$$;

insert into "Teams"("Id", "Name", "Description") values (0, 'NONE', '');

alter table "Projects" add column if not exists "TeamId" integer constraint "FK_Projects_Teams_Id" references "Teams" on delete set null default 0;

create or replace function "GetOtherUsersForTeamOfProject"(user_id integer, project_id integer) returns setof "Users" language plpgsql as $$
  declare teamId integer;
begin
  select distinct "TeamId" from "Projects" where "Id" = project_id into teamId;

  return query select u.* from "Users" u inner join "TeamUser" tu on u."Id" = tu."UserId" where tu."TeamId" = teamId and tu."UserId" != user_id;
end;
$$;

-- changeset hrodvitnir:7 splitStatements:false

create table "NotificationSubscriptionsRequests"
(
  "UserId"       integer    not null
    constraint "FK_NotificationSubscriptionsRequests_Users_Id"
    references "Users"
    on delete cascade,
  "CreationTime" timestamp  not null,
  "Code"         varchar(8) not null
);

-- changeset hrodvitnir:8 splitStatements:false

create or replace function "GetUsersForTeamOfProject"(project_id integer) returns setof "UsersWithRoles" language plpgsql as $$
begin
  return query select u.* from "UsersWithRoles" u inner join
  (select tu."UserId" as "UserId", p."Id" as "ProjectId" from "Projects" p inner join "TeamUser" tu on tu."TeamId" = p."TeamId") as pu
  on pu."UserId" = u."Id" where "ProjectId" = project_id;
end;
$$;

-- changeset hrodvitnir:9 splitStatements:false 

drop table "NotificationSubscriptionsRequests";

create table "NotificationSubscriptionsRequests"
(
  "Id" serial not null
  constraint "Pk_NotificationSubscriptionsRequests"
  primary key,
  "UserId"       integer    not null
    constraint "FK_NotificationSubscriptionsRequests_Users_Id"
    references "Users"
    on delete cascade,
  "CreationTime" timestamp  not null,
  "Code"         varchar(8) not null
);

-- changeset hrodvitnir:10 splitStatements:false 

create or replace function "InsertProject"(item project) returns project language plpgsql as $$
  declare returningId integer;
begin
  insert into "Projects"("AsanaGuid", "Name", "ShortName", "LastTaskNumber") values
  (item."AsanaGuid", item."Name", item."ShortName", item."LastTaskNumber") returning "Id" into returningId;

  item."Id" := returningId;
  return item;
 end;
$$;

-- changeset hrodvitnir:11 splitStatements:false 

create or replace function "UpdateProjectWithoutLastTaskNumber"(item project) returns void language plpgsql as $$
begin
  update "Projects" set
     "Name" = item."Name",
     "ShortName" = item."ShortName"
     where "Id" = item."Id";
end;
$$;


-- changeset hrodvitnir:12 splitStatements:false 

alter table "Sections" add column if not exists "BranchIgnore" boolean default false;

-- changeset hrodvitnir:13 splitStatements:false 

alter type section add attribute "BranchIgnore" boolean;

create or replace function "UpsertSections"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      if not exists(select * from "Sections" where "AsanaGuid" = item."AsanaGuid") then 
        begin
          insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId", "BranchIgnore") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId", item."BranchIgnore") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
        begin
          update "Sections" set
            "Name" = item."Name",
            "ShortName" = item."ShortName",
            "SectionType" = item."SectionType",
            "IsWatched" = item."IsWatched",
            "BranchIgnore" = item."BranchIgnore",
            "ProjectId" = item."ProjectId" 
            where "AsanaGuid" = item."AsanaGuid";
        end;
       end if;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertSectionsOrSelect"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare buffer section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      if not exists(select * from "Sections" where "AsanaGuid" = item."AsanaGuid") then
        begin
          insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId", "BranchIgnore") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId", item."BranchIgnore") returning "Id" into returningId;

          item."Id" := returningId;
          select array_append(result, item) into result;
        end;
      else
      	begin
          select * from "Sections" where "AsanaGuid" = item."AsanaGuid" into buffer;
          select array_append(result, buffer) into result;
      	end;
      end if;
    end loop;
  return result;
 end;
$$;

create or replace function "InsertSections"(sections section[]) returns section[] language plpgsql as $$
  declare result section[];
  declare item section;
  declare returningId integer;
begin
  foreach item in array sections
    loop
      insert into "Sections"("AsanaGuid", "Name", "SectionType", "IsWatched", "ShortName", "ProjectId", "BranchIgnore") values
          (item."AsanaGuid", item."Name", item."SectionType", item."IsWatched", item."ShortName", item."ProjectId", item."BranchIgnore") returning "Id" into returningId;

      item."Id" := returningId;
      select array_append(result, item) into result;
    end loop;
  return result;
 end;
$$;

-- changeset hrodvitnir:14 splitStatements:false 

create or replace function "UpdateSections"(sections section[]) returns void language plpgsql as $$
declare item section;
begin
  foreach item in array sections
    loop
      update "Sections" 
      	set "Name" = item."Name",
      	"SectionType" = item."SectionType",
      	"IsWatched" = item."IsWatched",
      	"ShortName" = item."ShortName",
      	"ProjectId" = item."ProjectId",
      	"BranchIgnore" = item."BranchIgnore"
      	where "Id" = item."Id";
    end loop;
 end;
$$;

-- changeset hrodvitnir:15 splitStatements:false 

create or replace view "ProjectWithSections" as select
  P."Id" as "PId", P."AsanaGuid" as "PAsanaGuid", P."Name" as "PName", P."ShortName" as "PShortName", P."LastTaskNumber", P."TeamId",
  S."Id" as "SId", S."AsanaGuid" as "SAsanaGuid", S."Name" as "SName", S."ShortName" as "SShortName", S."SectionType", S."IsWatched", S."ProjectId" as "SProjectId", S."BranchIgnore"
  from "Projects" P inner join "Sections" S on P."Id" = S."ProjectId";

create or replace view "FullProject" as select PS.*, T."Id" as "TId", T."Name" as "TName", T."Description", T."TeamleadId" from "ProjectWithSections" PS inner join "Teams" T on T."Id" = PS."TeamId";

-- changeset hrodvitnir:16

create or replace view "TeamsWithUsers" 
  as select t."Id", t."Name", t."Description", t."TeamleadId", tu."Id" as "UserId", tu."Login", tu."PasswordHash", tu."Salt", tu."TelegramId", tu."AsanaGuid", tu."BitbucketUuid"
  from (select tu."TeamId", u.* from "TeamUser" tu inner join "Users" u on tu."UserId" = u."Id") as tu right join "Teams" t on tu."TeamId" = t."Id";

-- changeset hrodvitnir:17 splitStatements:false 

create or replace view "ProjectWithSections" as select
  P."Id" as "PId", P."AsanaGuid" as "PAsanaGuid", P."Name" as "PName", P."ShortName" as "PShortName", P."LastTaskNumber", P."TeamId",
  S."Id" as "SId", S."AsanaGuid" as "SAsanaGuid", S."Name" as "SName", S."ShortName" as "SShortName", S."SectionType", S."IsWatched", S."ProjectId" as "SProjectId", S."BranchIgnore"
  from "Projects" P left join "Sections" S on P."Id" = S."ProjectId";

create table "RepositoryConfigs" (
  "Id" serial not null
  constraint "Pk_RepositoryConfig"
  primary key,
  "RepositoryName" varchar(256) not null,
  "PathName" varchar(256) not null,
  "Username" varchar(256) not null,
  "Password" varchar(512) not null,
  "Url" varchar(512) not null,
  "MainBranch" varchar(512) not null,
  "ProjectId" integer
  constraint "FK_RepositoryConfigs_Projects_Id"
  references "Projects"
  on delete set null
);

create type RepositoryConfig as 
(
  "Id" integer,
  "RepositoryName" varchar(256),
  "PathName" varchar(256),
  "Username" varchar(256),
  "Password" varchar(512),
  "Url" varchar(512),
  "MainBranch" varchar(512),
  "ProjectId" integer
);

create or replace function "InsertConfig"(item RepositoryConfig) returns RepositoryConfig language plpgsql as $$
  declare returningId integer;
begin
  insert into "RepositoryConfigs"("RepositoryName", "PathName", "Username", "Password", "Url", "MainBranch", "ProjectId") values
  (item."RepositoryName", item."PathName", item."Username", item."Password", item."Url", item."MainBranch", item."ProjectId") returning "Id" into returningId;

  item."Id" := returningId;
  return item;
 end;
$$;

-- changeset hrodvitnir:18 splitStatements:false 

create or replace function "UpdateConfig"(item RepositoryConfig) returns void language plpgsql as $$
begin
  update "RepositoryConfigs" set
     "RepositoryName" = item."RepositoryName",
	 "PathName" = item."PathName",
	 "Username" = item."Username",
	 "Password" = item."Password",
	 "Url" = item."Url",
	 "ProjectId" = item."ProjectId",
	 "MainBranch" = item."MainBranch"
     where "Id" = item."Id";
end;
$$;

-- changeset hrodvitnir:19
alter table "RepositoryConfigs"
drop column "ProjectId";

alter table "RepositoryConfigs"
add column 
  "ProjectId" integer
  constraint "FK_RepositoryConfigs_Projects_Id"
  references "Projects"
  on delete cascade;

-- changeset hrodvitnir:20
create or replace view "ProjectWithSectionsAndTeam" as select PS.*, T."Id" as "TId", T."Name" as "TName", T."Description", T."TeamleadId" from "ProjectWithSections" PS inner join "Teams" T on T."Id" = PS."TeamId";

create or replace view "FullProject"
  as
    select PST.*, RC."Id" as "RId", RC."RepositoryName", RC."PathName", RC."Username", RC."Password", RC."Url", RC."MainBranch", RC."ProjectId" as "RPid" from "ProjectWithSectionsAndTeam" as PST left join "RepositoryConfigs" RC on PST."PId" = RC."ProjectId";

-- changeset hrodvitnir:21 splitStatements:false 
alter table "RepositoryConfigs"
add column 
  "Email" varchar(256) not null;

alter type RepositoryConfig add attribute "Email" varchar(256);

create or replace function "InsertConfig"(item RepositoryConfig) returns RepositoryConfig language plpgsql as $$
  declare returningId integer;
begin
  insert into "RepositoryConfigs"("RepositoryName", "PathName", "Username", "Password", "Url", "MainBranch", "ProjectId", "Email") values
  (item."RepositoryName", item."PathName", item."Username", item."Password", item."Url", item."MainBranch", item."ProjectId", item."Email") returning "Id" into returningId;

  item."Id" := returningId;
  return item;
 end;
$$;

create or replace function "UpdateConfig"(item RepositoryConfig) returns void language plpgsql as $$
begin
  update "RepositoryConfigs" set
     "RepositoryName" = item."RepositoryName",
	 "PathName" = item."PathName",
	 "Username" = item."Username",
	 "Password" = item."Password",
	 "Url" = item."Url",
	 "ProjectId" = item."ProjectId",
	 "Email" = item."Email",
	 "MainBranch" = item."MainBranch"
     where "Id" = item."Id";
end;
$$;

create or replace view "FullProject"
  as
    select PST.*, RC."Id" as "RId", RC."RepositoryName", RC."PathName", RC."Username", RC."Password", RC."Url", RC."MainBranch", RC."ProjectId" as "RPid", RC."Email" as "REmail" from "ProjectWithSectionsAndTeam" as PST left join "RepositoryConfigs" RC on PST."PId" = RC."ProjectId";

-- changeset hrodvitnir:22 splitStatements:false

alter type integrator_user add attribute "TelegramUsername" varchar(256);
alter type integrator_user add attribute "AsanaUsername" varchar(256);
alter type integrator_user add attribute "BitbucketUsername" varchar(256);

alter table "Users"
add column "TelegramUsername" varchar(256);
alter table "Users"
add column "AsanaUsername" varchar(256);
alter table "Users"
add column "BitbucketUsername" varchar(256);

create or replace function "InsertUser"(person integrator_user) returns integrator_user language plpgsql as $$
declare returningId integer;
begin
	insert into "Users"("Login", "PasswordHash", "Salt", "TelegramId", "AsanaGuid", "BitbucketUuid", "TelegramUsername", "AsanaUsername", "BitbucketUsername") 
		values (person."Login", person."PasswordHash", person."Salt", person."TelegramId", person."AsanaGuid", person."BitbucketUuid", person."TelegramUsername", person."AsanaUsername", person."BitbucketUsername")
		returning "Id" into returningId;

	person."Id" := returningId;

	return person;
end;
$$;

create or replace function "UpdateUser"(person integrator_user) returns void language plpgsql as $$
begin
	update "Users"
		set
		"Login" = person."Login",
		"PasswordHash" = person."PasswordHash",
		"Salt" = person."Salt",
		"TelegramId" = person."TelegramId",
		"AsanaGuid" = person."AsanaGuid",
		"BitbucketUuid" = person."BitbucketUuid",
		"TelegramUsername" = person."TelegramUsername",
		"AsanaUsername" = person."AsanaUsername",
		"BitbucketUsername" = person."BitbucketUsername"
		where "Id" = person."Id";
end;
$$;

create or replace function "UpdateUserNonPrivate"(person integrator_user) returns void language plpgsql as $$
begin
	update "Users"
		set
		"Login" = person."Login",
		"TelegramId" = person."TelegramId",
		"AsanaGuid" = person."AsanaGuid",
		"BitbucketUuid" = person."BitbucketUuid",
		"TelegramUsername" = person."TelegramUsername",
		"AsanaUsername" = person."AsanaUsername",
		"BitbucketUsername" = person."BitbucketUsername"
		where "Id" = person."Id";
end;
$$;

-- changeset hrodvitnir:23 splitStatements:false

create or replace view "TeamsWithUsers" 
  as select t."Id", t."Name", t."Description", t."TeamleadId", tu."Id" as "UserId", tu."Login", tu."PasswordHash", tu."Salt", tu."TelegramId", tu."AsanaGuid", tu."BitbucketUuid", tu."TelegramUsername", tu."AsanaUsername", tu."BitbucketUsername" 
  from (select tu."TeamId", u.* from "TeamUser" tu inner join "Users" u on tu."UserId" = u."Id") as tu right join "Teams" t on tu."TeamId" = t."Id";;

-- changeset hrodvitnir:24 splitStatements:false
drop view "UsersWithRoles" cascade;

create or replace view "UsersWithRoles" as select u.*, ur."Id" as "RoleId", ur."Name" as "RoleName" from (select ur."UserId", r.* from "UserRole" ur inner join "Roles" r on ur."RoleId" = r."Id") as ur
  inner join "Users" u on ur."UserId" = u."Id";

create or replace function "GetUsersForTeamOfProject"(project_id integer) returns setof "UsersWithRoles" language plpgsql as $$
begin
  return query select u.* from "UsersWithRoles" u inner join
  (select tu."UserId" as "UserId", p."Id" as "ProjectId" from "Projects" p inner join "TeamUser" tu on tu."TeamId" = p."TeamId") as pu
  on pu."UserId" = u."Id" where "ProjectId" = project_id;
end;
$$;

-- changeset hrodvitnir:25 splitStatements:false

create or replace view "FullTeam" 
  as select t."Id", t."Name", t."Description", t."TeamleadId", tu."Id" as "UserId", tu."Login", tu."PasswordHash", tu."Salt",
  tu."TelegramId", tu."AsanaGuid", tu."BitbucketUuid", tu."TelegramUsername", tu."AsanaUsername",
  tu."BitbucketUsername", tu."RoleId", tu."RoleName"
  from (select tu."TeamId", ur.* from "TeamUser" tu inner join "UsersWithRoles" ur on tu."UserId" = ur."Id")
    as tu right join "Teams" t on tu."TeamId" = t."Id";

-- changeset hrodvitnir:26 splitStatements:false 

create or replace function "UpdateProjectWithoutLastTaskNumber"(item project) returns void language plpgsql as $$
begin
  update "Projects" set
     "Name" = item."Name",
     "TeamId" = item."TeamId",
     "ShortName" = item."ShortName"
     where "Id" = item."Id";
end;
$$;

-- changeset hrodvitnir:27 splitStatements:false 
alter type project add attribute "TeamId" integer;