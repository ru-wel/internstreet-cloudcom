-- Read-only demo admin behind "Try the demo as an admin". The API blocks every change
-- and file download for it (middleware/auth.js, routes/apply.js, routes/utils.js).
insert into try_users (name, email, password, user_role, is_demo)
values ('Demo Admin', 'demo.admin@internstreet.test', '!', 'admin', true)
on conflict (email) do nothing;
