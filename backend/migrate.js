// Runs migrations/*.sql in order, each once, recording them in schema_migrations.
// Fails if an applied file was edited: schema changes go in a new file.
import fs from 'fs';
import crypto from 'crypto';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Schema changes go over the direct (unpooled) connection
const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL });
await client.connect();

try {
  await client.query(`create table if not exists schema_migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )`);
  await client.query('alter table schema_migrations add column if not exists checksum text');
  const { rows } = await client.query('select name, checksum from schema_migrations');
  const applied = new Map(rows.map(r => [r.name, r.checksum]));

  const files = fs.readdirSync('migrations').filter(f => f.endsWith('.sql')).sort();
  const sql = {};
  const checksums = {};
  for (const file of files) {
    sql[file] = fs.readFileSync(`migrations/${file}`, 'utf8');
    // Normalize line endings so a Windows checkout doesn't count as an edit
    checksums[file] = crypto.createHash('sha256').update(sql[file].replace(/\r\n/g, '\n')).digest('hex');
  }

  // Check every applied file before running anything new
  for (const file of files) {
    if (!applied.has(file)) continue;
    if (applied.get(file) === null) {
      // Applied before checksums were recorded; trust the file as it is now
      await client.query('update schema_migrations set checksum = $1 where name = $2', [checksums[file], file]);
    } else if (applied.get(file) !== checksums[file]) {
      throw new Error(`${file} was edited after it was applied. Revert it and put the change in a new migration file.`);
    }
  }

  for (const file of files) {
    if (applied.has(file)) continue;
    await client.query('begin');
    try {
      await client.query(sql[file]);
      await client.query('insert into schema_migrations (name, checksum) values ($1, $2)', [file, checksums[file]]);
      await client.query('commit');
      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query('rollback');
      throw new Error(`${file} failed: ${error.message}`);
    }
  }
  console.log('Migrations up to date.');
} finally {
  await client.end();
}
