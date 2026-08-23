/*import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = 'admin@example.com';
  const password = 'MyStrongPassword123!';

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: {
      email,
    },

    update: {
      passwordHash,
    },

    create: {
      email,
      passwordHash,
    },
  });

  console.log('=================================');
  console.log('Admin created successfully!');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('=================================');
}

main()
  .catch((error) => {
    console.error('Failed to create admin:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });*/







import 'dotenv/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    console.log('Connected to PostgreSQL');

    const email = 'admin@example.com';
    const password = 'MyStrongPassword123!';

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await client.query(
      `
      INSERT INTO "Admin" ("email", "passwordHash", "createdAt", "updatedAt")
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT ("email")
      DO UPDATE SET
        "passwordHash" = EXCLUDED."passwordHash",
        "updatedAt" = NOW()
      RETURNING "id", "email";
      `,
      [email, passwordHash],
    );

    console.log('=================================');
    console.log('Admin created successfully!');
    console.log('ID:', result.rows[0].id);
    console.log('Email:', result.rows[0].email);
    console.log('Password:', password);
    console.log('=================================');
  } catch (error) {
    console.error('Failed to create admin:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();