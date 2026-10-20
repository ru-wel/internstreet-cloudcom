-- One application per student per job. Rows whose user was deleted (user_id null)
-- don't count, since Postgres treats nulls as distinct.
alter table try_applications
  add constraint try_applications_user_job_unique unique (user_id, job_id);
