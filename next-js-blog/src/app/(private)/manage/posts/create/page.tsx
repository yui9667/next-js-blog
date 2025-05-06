'use client';
import { useState, useActionState } from 'react';
import { createPost } from '@/lib/actions/createPost';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize';
import 'highlight.js/styles/github.css';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function CreatePage() {
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);

  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>New Post(Markdown Support)</h1>
      <form action={formAction} className='space-y-4'>
        {state.errors.title && (
          <p className='text-red-500 text-sm mt-1'>
            {state.errors.title.join(',')}
          </p>
        )}
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            name='title'
            placeholder='Please enter a title'
          />
        </div>
        <div>
          <Label htmlFor='topImage'>トップ画像</Label>
          <Input type='file' id='topImage' accept='image/*' name='topImage' />
          {state.errors.topImage && (
            <p className='text-red-500 text-sm mt-1'>
              {state.errors.topImage.join(',')}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='content'>Content</Label>
          <TextareaAutosize
            id='content'
            name='content'
            className='w-full border p-2'
            placeholder='Please enter in Markdown format '
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className='text-red-500 text-sm mt-1'>
              {state.errors.content.join(',')}
            </p>
          )}
        </div>
        <div className='text-right text-sm text-gray-500 mt-1'>
          Number of characters: {contentLength}
        </div>
        <div>
          <Button type='button' onClick={() => setPreview(!preview)}>
            {preview ? 'Close Preview' : 'Preview'}
          </Button>
        </div>
        {preview && (
          <div className='border p-4 bg-gray-50 prose max-w-none '>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <Button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Post
        </Button>
      </form>
    </div>
  );
}
