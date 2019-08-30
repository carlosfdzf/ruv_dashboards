DROP DATABASE IF EXISTS ruv_dashboards;
create database	ruv_dashboards;
use ruv_dashboards;


CREATE TABLE levels(
    id_levels INT(3) NOT NULL,
    name_levels VARCHAR(10) NOT NULL  
);
ALTER TABLE levels
    ADD PRIMARY KEY (id_levels);

ALTER TABLE levels 
    MODIFY id_levels INT(3) NOT NULL AUTO_INCREMENT;

DESCRIBE levels;


CREATE TABLE users(
    id_user INT(11) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL unique,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(50),
    level_users int(3),
    phone VARCHAR(15),
    accesso INT(1) not null default 0,
    type varchar(10) not null default 'usuario'
);

ALTER TABLE users
    ADD PRIMARY KEY (id_user) ON DELETE CASCADE;

ALTER TABLE users
    MODIFY id_user INT(11) NOT NULL AUTO_INCREMENT;


DESCRIBE users;


CREATE TABLE dashboards(
    id_dashboard INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url text NOT NULL,
    description TEXT,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    level_dashboards int(3)
);

ALTER TABLE dashboards
    ADD PRIMARY KEY (id_dashboard) ON DELETE CASCADE;

ALTER TABLE dashboards
    MODIFY id_dashboard INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE dashboards;

create table dash_user(
	id_dash_user int(3) not null,
	id_user int(11) not null,
    id_dashboard int(11) not null,
    constraint fk_userdash FOREIGN KEY (id_dashboard) REFERENCES dashboards(id_dashboard),
    constraint fk_dashuser FOREIGN KEY (id_user) REFERENCES users(id_user)
);

ALTER TABLE dash_user
    ADD PRIMARY KEY (id_dash_user);

ALTER TABLE dash_user
    MODIFY id_dash_user INT(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE dash_user
	ADD CONSTRAINT UC_dash_user UNIQUE (id_user,id_dashboard);

DESCRIBE dashboards;


create table sessions(
	session_id varchar(128) primary key,
    expires int(11) unsigned,
    data text
);

alter user 'root'@'localhost' identified with mysql_native_password by 'admin';


