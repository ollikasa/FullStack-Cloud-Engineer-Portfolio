import 'dotenv/config';
import { PrismaService } from '../src/prisma.service';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaService();

  try {
    await prisma.$connect();

    console.log('=================================');
    console.log('Prisma connected');
    console.log('=================================');

    const admin = await prisma.admin.findUnique({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!admin) {
      console.log('ADMIN NOT FOUND THROUGH PRISMA');
      return;
    }

    console.log('Admin found:', {
      id: admin.id,
      email: admin.email,
      hashLength: admin.passwordHash.length,
    });

    const passwordMatches = await bcrypt.compare(
      'MyStrongPassword123!',
      admin.passwordHash,
    );

    console.log(
      'PASSWORD MATCHES THROUGH PRISMA:',
      passwordMatches,
    );
  } catch (error) {
    console.error('PRISMA ERROR:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();