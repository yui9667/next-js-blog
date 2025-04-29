import { PrismaClient } from '../src/generated/prisma';
import * as bcypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const hashedPassword = await bcypt.hash('password123', 12);
  const dummyImages = [
    'https://picsum.photos/seed/post1/600/400',
    'https://picsum.photos/seed/post2/600/400',
  ];
  //*User 作成
  const user = await prisma.user.create({
    data: {
      email: 'test@mail.com',
      name: 'test User',
      password: hashedPassword,
      post: {
        create: [
          {
            title: 'The first blog',
            content: 'This is for the first time posting in blog',
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: 'The second blog',
            content: 'This is the second post in blog',
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });
  console.log({ user });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
