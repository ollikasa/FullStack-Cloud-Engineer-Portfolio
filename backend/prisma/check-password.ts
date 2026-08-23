import 'dotenv/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  console.log('Connected to PostgreSQL');

  const result = await client.query(
    'SELECT "id", "email", "passwordHash" FROM "Admin" WHERE "email" = $1',
    ['admin@example.com'],
  );

  if (result.rows.length === 0) {
    console.log('ADMIN NOT FOUND');
    await client.end();
    return;
  }

  const admin = result.rows[0];

  console.log('Admin found:', {
    id: admin.id,
    email: admin.email,
    hashLength: admin.passwordHash.length,
  });

  const matches = await bcrypt.compare(
    'MyStrongPassword123!',
    admin.passwordHash,
  );

  console.log('PASSWORD MATCHES:', matches);

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});