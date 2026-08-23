import 'dotenv/config';
import { Client } from 'pg';

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

  console.log(
    result.rows.map((row) => ({
      id: row.id,
      email: row.email,
      hashExists: !!row.passwordHash,
      hashLength: row.passwordHash
        ? row.passwordHash.length
        : 0,
    })),
  );

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});