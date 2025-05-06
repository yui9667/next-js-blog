import { prisma } from './prisma';

export async function getOwnPosts(userId: string) {
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
  return posts;
}
export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      AND: [{ authorId: userId }, { id: postId }],
    },
    select: {
      id: true,
      title: true,
      content: true,
      topImage: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
