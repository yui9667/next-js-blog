import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import Link from 'next/link';
export default function PostDropdownMenu({ postId }: { postId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='px-2 py-1 border rounded-md'>
        ...
      </DropdownMenuTrigger>

      <DropdownMenuContent className='z-20'>
        <DropdownMenuItem asChild>
          <Link href={`/manage/posts/${postId}`} className='cursor-pointer'>
            Detail
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/manage/posts/edit/${postId}`}
            className='cursor-pointer'
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='text-red-600 cursor-pointer'>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
