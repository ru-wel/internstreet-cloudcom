// Finds files in the uploads bucket that no application points to (e.g. the process died
// between uploading and saving the application) and deletes them with --delete.
// Usage: npm run clean-uploads            (report only)
//        npm run clean-uploads -- --delete
import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { s3, BUCKET } from './config/storage.js';
import { sequelize } from './config/db_config.js';

// Skip recent files so an upload that's still being saved isn't treated as a stray
const MIN_AGE_MS = 60 * 60 * 1000;
const shouldDelete = process.argv.includes('--delete');

const [rows] = await sequelize.query('select resume, cover_letter from try_applications', { logging: false });
const referenced = new Set(rows.flatMap((row) => [row.resume, row.cover_letter]));

const strays = [];
let token;
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }));
  for (const object of page.Contents ?? []) {
    if (!referenced.has(object.Key) && Date.now() - object.LastModified.getTime() > MIN_AGE_MS) {
      strays.push(object.Key);
    }
  }
  token = page.NextContinuationToken;
} while (token);

console.log(`${strays.length} unreferenced file(s)${strays.length ? ':' : ''}`);
strays.forEach((key) => console.log(`  ${key}`));

if (shouldDelete) {
  // DeleteObjects takes at most 1000 keys per call
  for (let i = 0; i < strays.length; i += 1000) {
    const batch = strays.slice(i, i + 1000);
    const result = await s3.send(new DeleteObjectsCommand({ Bucket: BUCKET, Delete: { Objects: batch.map((Key) => ({ Key })) } }));
    if (result.Errors?.length) {
      console.error(`Could not delete ${result.Errors.map((e) => `${e.Key} (${e.Code})`).join(', ')}`);
      process.exitCode = 1;
    }
  }
  console.log('Deleted.');
} else if (strays.length) {
  console.log('Run with --delete to remove them.');
}

await sequelize.close();
