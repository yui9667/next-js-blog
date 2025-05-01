'use client';
//*Hock を使うため
import { Input } from '../ui/input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  //*Searchが変わったら実行される仕組み
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  //*debouncedSearch が更新されたら実行
  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push('/');
    }
  });
  return (
    <>
      <Input
        placeholder='Search'
        className='w-[200px] lg:w-[300px]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
