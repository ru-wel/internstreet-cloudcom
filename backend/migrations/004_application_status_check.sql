-- Only the three statuses the app understands; the API checks this too
alter table try_applications
  add constraint try_applications_status_check check (status in ('pending', 'approved', 'denied'));
