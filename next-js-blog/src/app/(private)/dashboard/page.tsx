import { getOwnPosts } from '@/lib/ownPost';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import PostDropdownMenu from '@/components/post/PostDropdownMenu';
import Link from 'next/link';
export default async function DashBoardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    throw new Error('Bad request');
  }
  const posts = await getOwnPosts(userId);

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl foot-bold mb-4'>Article List</h1>
        <Button>
          <Link href='../manage/posts/create'>Create a new article</Link>{' '}
        </Button>
      </div>
      <table className='table-auto w-full border-collapse border '>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-2 text-center'>Title</th>
            <th className='border p-2 text-center'>Display / Hidden</th>
            <th className='border p-2 text-center'>Updated</th>
            <th className='border p-2 text-center'>Operation</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className='border p-2'>{post.title}</td>
              <td className='border p-2 text-center'>
                {post.published ? 'Display' : ' Hidden'}
              </td>
              <td className='border p-2 '>
                {new Date(post.updatedAt).toLocaleString()}
              </td>
              <td className='border p-2 text-center'>
                <PostDropdownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
