-- Only the two roles the app understands; the API checks this too
alter table try_users
  add constraint try_users_user_role_check check (user_role in ('user', 'admin'));
