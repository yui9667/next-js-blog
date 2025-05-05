import { prisma } from './prisma';

export async function getOwnPosts(userId: string) {
  console.log(userId);
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  console.log(posts);
  return posts;
}
