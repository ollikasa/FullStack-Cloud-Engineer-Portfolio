/*import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'YOUR_ADMIN_EMAIL';
  const password = 'CHANGE_THIS_PASSWORD';

  const passwordHash = await bcrypt.hash(
    password,
    12,
  );

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

  console.log('Admin created successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });*/






  import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
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
  });