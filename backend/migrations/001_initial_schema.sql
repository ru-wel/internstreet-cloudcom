-- Matches the Sequelize models. Sequelize pluralizes model names
-- (try_application -> try_applications) and writes a camelCase "updatedAt".

create table try_users (
  id          serial primary key,
  created_at  timestamptz default now(),
  name        varchar(100) not null,
  email       varchar(100) not null unique,
  password    varchar(255) not null,
  user_role   varchar(255) not null default 'user',
  location    varchar(255),
  number      varchar(11),
  bio         varchar(300),
  "updatedAt" timestamptz not null default now()
);

create table try_jobs (
  id          serial primary key,
  created_at  timestamptz default now(),
  title       varchar(255) not null,
  company     varchar(255) not null,
  location    varchar(255) not null,
  details     jsonb not null, -- { job_description, job_qualifications, employer_questions }
  logo        varchar(255),
  "updatedAt" timestamptz not null default now()
);

create table try_applications (
  id           serial primary key,
  applied_at   timestamptz default now(),
  name         varchar(255) not null,
  email        varchar(255) not null,
  c_name       varchar(255) not null,
  c_location   varchar(255) not null,
  c_position   varchar(255) not null,
  c_logo       varchar(255) not null,
  resume       varchar(255) not null,
  cover_letter varchar(255) not null,
  status       varchar(255) not null,
  -- no action: a job with applications can't be deleted
  job_id       integer not null references try_jobs (id) on delete no action on update cascade,
  "updatedAt"  timestamptz not null default now()
);

create table logs (
  id           serial primary key,
  executed_at  timestamptz default now(),
  email        varchar(255) not null,
  action       varchar(255) not null,
  ip_address   varchar(255) not null,
  os_version   varchar(255) not null,
  browser_type varchar(255) not null,
  location     varchar(255) not null
);
