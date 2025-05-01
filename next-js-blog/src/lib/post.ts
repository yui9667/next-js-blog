import { prisma } from '@/lib/prisma';

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getPostId(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return post;
}

export async function searchPosts(search: string) {
  const decodedSearch = decodeURIComponent(search);
  //*正規表現 /[\s ] + /g は、スペースや空白文字の連続を削除
  const normalizedSearch = decodedSearch.replace(/[\s ] + /g, '').trim();
  //*正規化された検索文字列を1文字ずつに分割し、空の文字列を除去します
  //*​filter(Boolean) は、JavaScript において配列から「falsy（偽と評価される）」値を取り除くための簡潔な方法
  const searchWords = normalizedSearch.split('').filter(Boolean);

  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));
  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}
