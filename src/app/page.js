'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import { fetchPosts } from '@/lib/postApi';
import { categories } from '@/data/constants'; // Import categories
import {formatToLocaleDate} from '@/utils/format'
// Define a color mapping for each category
const categoryColors = {
  0: 'bg-blue-500', // تکنولوژی
  1: 'bg-green-500', // سلامت
  2: 'bg-red-500', // مسافرت
  3: 'bg-yellow-500', // آشپزی
  4: 'bg-purple-500', // فرهنگ و هنر
  5: 'bg-indigo-500', // تاریخ
  6: 'bg-pink-500', // سبک زندگی
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        if (!data || data.length === 0) {
          setErrorMessage('نوشته ای وجود ندارد');
        }
      } catch (error) {
        setErrorMessage(error.message || 'خطا در بارگیری نوشته ها');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };
    loadPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 w-full h-full">
        <h1 className="text-2xl font-bold mt-4"> نوشته های وبلاگ </h1>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
        < div className="w-full flex flex-col items-center justify-center">
         <p className="text-red-500">{errorMessage}</p>
         <Link  href={`/create`} className={` border-gray-600 dark:border-gray-300 text-gray-800 dark:text-gray-300 mt-5 border px-2 py-1 rounded-md w-fit text-sm `}>ایجاد نوشته جدید</Link >
           
        </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-4 sm:col-span-1 mt-5 ">
            {posts.map(post => (
              <div key={post._id} className="border rounded-md p-4 shadow-sm bg-gray-100 dark:bg-gray-800 h-44 relative">
                {/* Badge for the category */}
                <div className={`absolute top-1 left-1 text-gray-800 text-xs font-light bg-gray-200 py-1 px-2 rounded-md flex flex-row justify-center items-center `}>
                  {categories[post.category].text}
                  <div className={`w-2 h-2 rounded-full mx-2 ${categoryColors[post.category]}`}></div>
                </div>

                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm font-medium my-2 text-gray-600 dark:text-gray-300">{post.subtitle ? post.subtitle.slice(0, 100) : ""}</p>
              <p className='absolute bottom-5 left-4 text-sm font-medium'>{formatToLocaleDate(post.createdAt)}</p>
                <Link  href={`/posts/${post._id}`} className={`absolute bottom-4 right-4 border-gray-600 dark:border-gray-300 text-gray-800 dark:text-gray-300 mt-auto border px-2 py-1 rounded-md w-auto text-sm `}>مشاهده</Link >
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
