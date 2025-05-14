import { writeFile } from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';
export async function saveImage(file: File): Promise<String | null> {
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === 'true';
  if (useSupabase) {
    return await saveImageToSupabase(file);
  } else {
    return await saveImageToLocal(file);
  }
}

export async function saveImageToLocal(file: File): Promise<String | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/images');
  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    return null;
  }
}

export async function saveImageToSupabase(file: File): Promise<String | null> {
  const fileName = `${Date.now()}_ ${file.name}`;
  const { error } = await supabase.storage
    .from('next-js-blog-bucket')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.log('Upload error*', error.message);
    return null;
  }
  const { data: publicUrlData } = supabase.storage
    .from('next-js-blog-bucket')
    .getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}
