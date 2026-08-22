/*import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.create({
    data: {
      name: "Oljira Likasa",
      title: "Computer Engineer | Cloud Engineering",
      bio: "Computer Engineering graduate developing practical skills in cloud infrastructure, software development, networking and DevOps.",
      vision:
        "Become a highly capable engineer who builds reliable, scalable and useful technology systems.",
      mission:
        "Continuously learn, build practical systems and solve real-world problems through technology.",
      location: "Addis Ababa, Ethiopia",
      email: "YOUR_EMAIL",
      phone: "YOUR_PHONE",
      github: "YOUR_GITHUB",
      linkedin: "YOUR_LINKEDIN",
      website: "YOUR_WEBSITE",
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());*/





/*
  import {
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.document.deleteMany();

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
      email: 'YOUR_EMAIL',
      phone: 'YOUR_PHONE',
      github: 'https://github.com/YOUR_USERNAME',
      linkedin: 'https://www.linkedin.com/in/YOUR_USERNAME',
      website: 'https://YOUR_DOMAIN',
    },
  });

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
        title: 'BidAssist AI',
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

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment.');
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Starting database seed...');

  // Delete existing data
  await prisma.document.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.project.deleteMany();
  await prisma.education.deleteMany();
  await prisma.profile.deleteMany();

  // Profile
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

      email: 'YOUR_EMAIL',

      phone: 'YOUR_PHONE',

      github:
        'https://github.com/YOUR_USERNAME',

      linkedin:
        'https://www.linkedin.com/in/YOUR_USERNAME',

      website:
        'https://YOUR_DOMAIN',
    },
  });

  // Education
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

  // Projects
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

main()
  .catch((error) => {
    console.error('Database seed failed:');
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });