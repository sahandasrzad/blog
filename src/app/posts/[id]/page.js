import Navbar from '@/components/Navbar';
import { categories } from '@/data/constants'
import { fetchPostById } from '@/lib/postApi';
import {formatToLocaleDate} from '@/utils/format'
export default async function PostDetail({ params }) {
  const post = await fetchPostById(params.id);

  return (
    <div>
      <Navbar />
      <div className='w-full h-full p-4'>
        <div className='px-4 mt-12'>
          <div className='flex flex-row items-center my-2' >
           
            <div className='mr-auto w-fit text-sm font-bold text-gray-600 dark:text-gray-300'>
              دسته بندی نوشته : <span className='text-blue-500 dark:text-blue-700'>{categories[post.category].text}</span>
            </div>
            <div className='mr-4 w-fit text-sm font-bold text-gray-600 dark:text-gray-300'>
              تاریخ ایجاد   : <span className='text-gray-600 dark:text-white'>{formatToLocaleDate(post.updatedAt)}</span>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold">{post.title}</h1>
          <p className='text-lg  my-2 font-bold text-gray-600 dark:text-gray-300'>{post.subtitle}</p>
          <p className='text-sm font-medium  text-gray-800 dark:text-gray-200 text-justify my-5'>{post.content}</p>
          <div className="w-full mt-5 flex flex-row h-24">
            <a href={`/update/${post._id}`} className={`  border-orange-500 dark:border-gray-300 text-orange-500 dark:text-gray-300 mt-auto border px-2 py-1 rounded-md w-auto text-sm `}>ویرایش</a>
          </div>
        </div>

      </div>
    </div>
  );
}
