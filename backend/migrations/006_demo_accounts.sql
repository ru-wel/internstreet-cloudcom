-- Demo accounts behind the "Try the demo" buttons on the login page. They log in only
-- through POST /api/login/demo: '!' isn't a bcrypt hash, so no password matches it.
alter table try_users add column is_demo boolean not null default false;

insert into try_users (name, email, password, user_role, location, number, bio, is_demo)
values ('Demo Student', 'demo.student@internstreet.test', '!', 'user', 'Quezon City', '09170000000',
        'BS Information Technology student looking for a web development internship.', true)
on conflict (email) do nothing;
