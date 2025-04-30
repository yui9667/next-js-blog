import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCardProps } from '@/types/post';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { se } from 'date-fns/locale';
export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <Link href='{`/post/${post.id}`}'>
        <CardHeader>
          <CardTitle className='line-clamp-2'>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
            {post.content}
          </p>
          <div className='flex items-center justify-between text-sm text-gray-500'>
            <span>{post.author.name}</span>

            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: se,
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
