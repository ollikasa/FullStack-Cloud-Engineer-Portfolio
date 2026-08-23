import 'dotenv/config';
import { PrismaService } from '../src/prisma.service';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaService();

  await prisma.$connect();

  console.log('Prisma connected');

  const admin = await prisma.admin.findUnique({
    where: {
      email: 'admin@example.com',
    },
  });

  if (!admin) {
    console.log('ADMIN NOT FOUND');
    await prisma.$disconnect();
    return;
  }

  console.log('Admin found:', {
    id: admin.id,
    email: admin.email,
    hashExists: !!admin.passwordHash,
    hashLength: admin.passwordHash.length,
  });

  const passwordMatches = await bcrypt.compare(
    'MyStrongPassword123!',
    admin.passwordHash,
  );

  console.log('Password matches:', passwordMatches);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('ERROR:', error);
  process.exit(1);
});