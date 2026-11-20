import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hashPassword } from 'better-auth/crypto';

const prisma = new PrismaClient();

// Shared password for every seeded account — see README.md "Seeded accounts".
const SEED_PASSWORD = 'password123';

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clear existing data
  console.log('🧹 Clearing existing data...');
  // Delete in order to avoid foreign key constraint errors
  await prisma.auditLog.deleteMany();
  await prisma.progressRecord.deleteMany();
  await prisma.codingProblem.deleteMany();
  await prisma.codeSnippet.deleteMany();
  await prisma.note.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data.');

  // 2. Create Users
  console.log('👤 Creating users...');
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin Developer',
      email: 'admin@codespace.dev',
      emailVerified: true,
      role: 'ADMIN',
      image: faker.image.avatar(),
    },
  });

  const regularUsers = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          emailVerified: true,
          role: 'MEMBER',
          image: faker.image.avatar(),
        },
      })
    )
  );

  const guestUser = await prisma.user.create({
    data: {
      name: 'Guest Developer',
      email: 'guest@codespace.dev',
      emailVerified: true,
      role: 'GUEST',
      image: faker.image.avatar(),
    },
  });

  const allUsers = [adminUser, guestUser, ...regularUsers];
  console.log(`✅ Created ${allUsers.length} users.`);

  // 2b. Create credential Accounts so every seeded user can actually log in
  // via Better Auth's email/password provider (a User row alone is not
  // enough — Better Auth authenticates against the Account table).
  console.log('🔑 Creating login credentials...');
  const hashedSeedPassword = await hashPassword(SEED_PASSWORD);
  await Promise.all(
    allUsers.map((user) =>
      prisma.account.create({
        data: {
          id: `${user.id}-credential`,
          accountId: user.id,
          providerId: 'credential',
          userId: user.id,
          password: hashedSeedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );
  console.log(`✅ All seeded users can log in with password: "${SEED_PASSWORD}"`);

  // 3. Create Projects and Tasks
  console.log('📁 Creating projects and tasks...');
  for (const user of allUsers) {
    const numProjects = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < numProjects; i++) {
      const project = await prisma.project.create({
        data: {
          name: faker.company.catchPhrase(),
          description: faker.lorem.sentence(),
          status: faker.helpers.arrayElement(['active', 'archived', 'completed']),
          language: faker.helpers.arrayElement(['TypeScript', 'Go', 'Python', 'Rust']),
          userId: user.id,
        },
      });

      // Create tasks for the project
      const numTasks = faker.number.int({ min: 2, max: 5 });
      await Promise.all(
        Array.from({ length: numTasks }).map(() =>
          prisma.task.create({
            data: {
              title: faker.hacker.phrase(),
              priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
              completed: faker.datatype.boolean(0.4),
              projectId: project.id,
              userId: user.id,
            },
          })
        )
      );
    }
  }
  console.log('✅ Created projects and tasks.');

  // 4. Create Notes, Snippets, Problems, and Progress
  console.log('📝 Creating notes, snippets, problems, and progress records...');
  for (const user of allUsers) {
    // Notes
    await Promise.all(
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() =>
        prisma.note.create({
          data: {
            title: faker.lorem.words(3),
            snippet: faker.lorem.paragraph(),
            date: faker.date.recent().toLocaleDateString(),
            userId: user.id,
          },
        })
      )
    );

    // Code Snippets
    await Promise.all(
      Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(() =>
        prisma.codeSnippet.create({
          data: {
            title: faker.hacker.verb() + ' function',
            language: faker.helpers.arrayElement(['typescript', 'python', 'bash', 'json']),
            code: `// Generated code snippet\nfunction ${faker.hacker.verb()}() {\n  console.log("${faker.hacker.phrase()}");\n}`,
            userId: user.id,
          },
        })
      )
    );

    // Coding Problems
    await Promise.all(
      Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() =>
        prisma.codingProblem.create({
          data: {
            title: `LeetCode - ${faker.hacker.noun()}`,
            url: faker.internet.url(),
            difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
            status: faker.helpers.arrayElement(['todo', 'in-progress', 'done']),
            userId: user.id,
          },
        })
      )
    );

    // Progress Records
    await Promise.all(
      Array.from({ length: faker.number.int({ min: 5, max: 10 }) }).map(() =>
        prisma.progressRecord.create({
          data: {
            date: faker.date.recent({ days: 30 }),
            metric: faker.helpers.arrayElement(['problems_solved', 'lines_of_code', 'hours_coded']),
            value: faker.number.int({ min: 1, max: 100 }),
            userId: user.id,
          },
        })
      )
    );

    // Audit Logs
    await Promise.all(
      Array.from({ length: faker.number.int({ min: 4, max: 8 }) }).map(() =>
        prisma.auditLog.create({
          data: {
            title: faker.helpers.arrayElement(['Pushed to main', 'Completed Task', 'Added Snippet', 'Resolved Bug']),
            description: faker.lorem.sentence(),
            time: 'Recently',
            userId: user.id,
          },
        })
      )
    );
  }
  console.log('✅ Created notes, snippets, problems, and progress records.');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
