-- Applications were owned by email, which a user can change and which can be
-- registered again after a user is deleted. Own them by user id instead.
-- email stays as a record of who applied. Deleting a user keeps their
-- applications for admins but leaves them with no owner (user_id null).
alter table try_applications
  add column user_id integer references try_users (id) on delete set null on update cascade;

update try_applications a set user_id = u.id from try_users u where u.email = a.email;

create index try_applications_user_id_idx on try_applications (user_id);
