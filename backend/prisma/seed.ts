import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment.');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 2,
  connectionTimeoutMillis: 10000,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Starting database seed...');

  // ==========================================
  // ADMIN ACCOUNT
  // ==========================================

  const passwordHash = await bcrypt.hash(
    'MyStrongPassword123!',
    12,
  );

  await prisma.admin.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {
      passwordHash,
    },
    create: {
      email: 'admin@example.com',
      passwordHash,
    },
  });

  console.log('Admin account created/updated.');

  // ==========================================
  // DELETE EXISTING PORTFOLIO DATA
  // ==========================================

  await prisma.document.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.project.deleteMany();
  await prisma.education.deleteMany();
  await prisma.profile.deleteMany();

  // ==========================================
  // PROFILE
  // ==========================================

  await prisma.profile.create({
    data: {
      name: 'Oljira Likasa',

      title: 'Computer Engineer | Cloud Engineering',

      bio:
        'Computer Engineering graduate focused on Cloud Engineering, Software Development, Networking and DevOps.',

      vision:
        'Become a highly capable engineer who builds reliable, scalable and useful technology systems.',

      mission:
        'Continuously learn, build practical systems and solve real-world problems through technology.',

      location: 'Addis Ababa, Ethiopia',

      email: 'oljelikonafo@gmail.com',

      phone: '0907151330',

      github:
        'https://github.com/ollikasa',

      linkedin:
        'https://www.linkedin.com/in/oljira-likasa-nafabas/',

      website: null,
    },
  });

  // ==========================================
  // EDUCATION
  // ==========================================

  await prisma.education.create({
    data: {
      institution: 'Jimma University',

      degree:
        'B.Sc. in Electrical and Computer Engineering',

      field: 'Computer Engineering',

      endYear: 2026,

      description:
        'Computer Engineering education with focus on computing, electronics, networking and software systems.',
    },
  });

  // ==========================================
  // PROJECTS
  // ==========================================

  await prisma.project.createMany({
    data: [
      {
        title:
          'Intelligent Traffic Management System',

        description:
          'Intelligent system designed to improve traffic management.',

        problem:
          'Traffic congestion and inefficient traffic management.',

        solution:
          'Use intelligent computing and data-driven techniques to improve traffic management.',

        technologies:
          'Python, Machine Learning, IoT, Networking',
      },

      {
        title:
          'AI-Integrated Client Management System',

        description:
          'Web application for managing clients with intelligent functionality.',

        problem:
          'Manual and inefficient client management.',

        solution:
          'Create a centralized web-based management platform.',

        technologies:
          'React, Next.js, Node.js, AI, SQLite',
      },

      {
        title:
          'BidAssist AI',

        description:
          'AI-assisted tender information platform.',

        problem:
          'Difficulty understanding tender information across languages.',

        solution:
          'Use AI and NLP to assist users with tender information.',

        technologies:
          'Python, NLP, AI, React, Next.js, FastAPI',
      },

      {
        title:
          'Cloud Engineering Portfolio',

        description:
          'Production-style portfolio demonstrating Cloud Engineering and DevOps practices.',

        problem:
          'Need a practical project demonstrating cloud engineering skills.',

        solution:
          'Build, containerize, automate and deploy the portfolio using modern cloud technologies.',

        technologies:
          'Next.js, NestJS, Docker, Kubernetes, AWS, Terraform, CI/CD',
      },
    ],
  });

  console.log('Database seeded successfully.');
}

// ==========================================
// ERROR HANDLING
// ==========================================

main()
  .catch((error) => {
    console.error('Database seed failed:');
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });