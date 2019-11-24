drop database if exists taskly;
create database taskly;

use taskly;

create table usuario (
	id int primary key auto_increment,
	email varchar(256) not null,
	senha varchar(256) not null,
	created_at timestamp not null default now()
);

create table tarefa (
	id int primary key auto_increment,
	id_usuario int not null,
	descricao varchar(100) not null,
	progresso int not null default 0,
	created_at timestamp not null default now()
);