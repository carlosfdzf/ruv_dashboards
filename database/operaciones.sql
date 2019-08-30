select distinct id_user from dash_user where id_dashboard != 008;
select id_user from dash_user where id_dashboard=008;

select * from users;
select * from dashboards;
select * from dash_user;
delete from dash_user where id_user = 2  and id_dashboard=10;
select * from dash_user inner join users on users.id_user = dash_user.id_user where id_dashboard=2;
select * from dash_user inner join dashboards on dashboards.id_dashboard = dash_user.id_dashboard;
select * from dash_user inner join users on users.id_user = dash_user.id_user inner join dashboards on dashboards.id_dashboard = dash_user.id_dashboard where users.id_user = 1;



delete from users where id_user > 10;


select * from dash_user where id_dashboard=001;
select users.username from dash_user inner join users on users.id_user = dash_user.id_user where id_dashboard=001;
select users.username from dash_user left outer join users on users.id_user = dash_user.id_user where id_dashboard!=001;
