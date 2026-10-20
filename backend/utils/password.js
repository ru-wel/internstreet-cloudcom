import bcrypt from 'bcryptjs';

// Same rule as the register and add-admin forms. Checked here because the routes
// only ever see the hash after this point, so the model can't check it.
export function checkPassword(password) {
  if (typeof password !== 'string' || password.length < 8 || !/[A-Z]/.test(password)) {
    return 'Password must be at least 8 characters and include an uppercase letter.';
  }
  // bcrypt ignores everything past 72 bytes, so the rest of a longer password wouldn't count
  if (Buffer.byteLength(password) > 72) {
    return 'Password is too long. The limit is 72 bytes: most letters count as 1, but accented letters count as 2 and emoji as 4.';
  }
  return null;
}

export const hashPassword = (password) => bcrypt.hash(password, 10);
