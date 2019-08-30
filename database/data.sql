
INSERT INTO levels(id_levels, name_levels) values(01,"normal");
INSERT INTO levels(id_levels, name_levels) values(02,"bronce");
INSERT INTO levels(id_levels, name_levels) values(03,"plata");
INSERT INTO levels(id_levels, name_levels) values(04,"oro");
INSERT INTO levels(id_levels, name_levels) values(05,"platino");


INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(001,"usuario1","apellido1","username1","password1","usuario1@pruebas.com","5535098151",01);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(002,"usuario2","apellido2","username2","password2","usuario2@pruebas.com","5535098152",02);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(003,"usuario3","apellido3","username3","password3","usuario3@pruebas.com","5535098153",03);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(004,"usuario4","apellido4","username4","password4","usuario4@pruebas.com","5535098154",04);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(005,"usuario5","apellido5","username5","password5","usuario5@pruebas.com","5535098155",05);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(006,"usuario6","apellido6","username6","password6","usuario6@pruebas.com","5535098156",01);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(007,"usuario7","apellido7","username7","password7","usuario7@pruebas.com","5535098157",02);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(008,"usuario8","apellido8","username8","password8","usuario8@pruebas.com","5535098158",03);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(009,"usuario9","apellido9","username9","password9","usuario9@pruebas.com","5535098159",04);
INSERT INTO users(id_user, name, surname, username, password, email, phone, level_users) values(010,"usuario10","apellido10","username10","password10","usuario10@pruebas.com","5535098160",05);

INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (001,"dashboard1","/dashboard1","descripcion de dashboard 1",01);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (002,"dashboard2","/dashboard2","descripcion de dashboard 2",02);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (003,"dashboard3","/dashboard3","descripcion de dashboard 3",03);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (004,"dashboard4","/dashboard4","descripcion de dashboard 4",04);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (005,"dashboard5","/dashboard5","descripcion de dashboard 5",05);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (006,"dashboard6","/dashboard6","descripcion de dashboard 6",01);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (007,"dashboard7","/dashboard7","descripcion de dashboard 7",02);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (008,"dashboard8","/dashboard8","descripcion de dashboard 8",03);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (009,"dashboard9","/dashboard9","descripcion de dashboard 9",04);
INSERT INTO dashboards(id_dashboard, title, url, description, level_dashboards) values (010,"dashboard10","/dashboard10","descripcion de dashboard 10",05);


insert into dash_user(id_user, id_dashboard) values (001,001);
insert into dash_user(id_user, id_dashboard) values (001,2);
insert into dash_user(id_user, id_dashboard) values (001,003);
insert into dash_user(id_user, id_dashboard) values (001,004);
insert into dash_user(id_user, id_dashboard) values (002,001);
insert into dash_user(id_user, id_dashboard) values (002,005);
insert into dash_user(id_user, id_dashboard) values (004,002);


insert into dash_user(id_user, id_dashboard) values (008,008);
insert into dash_user(id_user, id_dashboard) values (009,008);
insert into dash_user(id_user, id_dashboard) values (0010,008);
insert into dash_user(id_user, id_dashboard) values (008,009);
