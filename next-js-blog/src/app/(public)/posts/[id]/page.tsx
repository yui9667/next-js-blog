import { getPostId } from '@/lib/post';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { se } from 'date-fns/locale';
type Params = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const post = await getPostId(id);

  if (!post) {
    notFound();
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='max-w-3xl max-auto'>
        {post.topImage && (
          <div className='relative w-full h-64 lg:h-96'>
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes='100vw'
              className='rounded-t-md object-cover'
            />
          </div>
        )}

        <CardHeader>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-sm text-gray-500'>Author :{post.author.name}</p>
            <time className='text-sm text-gray-500'>
              {format(new Date(post.createdAt), 'dd/MM/yyyy', {
                locale: se,
              })}
            </time>
          </div>
          <CardTitle className='text-3xl font-bold'>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>{post.content}</CardContent>
      </Card>
    </div>
  );
}
