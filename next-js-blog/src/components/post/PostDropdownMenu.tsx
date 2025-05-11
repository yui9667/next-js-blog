'use client';
import { useState } from 'react';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import DeletePostDialog from './DeletePostDialog';

export default function PostDropdownMenu({ postId }: { postId: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
              href={`/manage/posts/${postId}/edit/`}
              className='cursor-pointer'
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setIsDropdownOpen(false), setShowDeleteDialog(true);
            }}
            className='text-red-600 cursor-pointer'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteDialog && (
        <DeletePostDialog
          postId={postId}
          isOpen={showDeleteDialog}
          onOpenChange={handleDeleteDialogChange}
        />
      )}
    </>
  );
}
