'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { updatePost, deletePost } from '@/lib/postApi';
import { categories } from '@/data/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define your validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required('عنوان الزامی است'),
  subtitle: yup.string().notRequired(),
  content: yup.string().required('محتوا الزامی است'),
  category: yup.number().required('دسته‌بندی الزامی است'),
});

export default function UpdatePost({ post }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(post ? post.category : categories[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize useForm with the resolver
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      category: post.category,
    },
  });

  useEffect(() => {
    if (post) {
      setSelectedCategory(post.category);
    }
  }, [post]);

  const handleCategoryChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setSelectedCategory(selectedValue);
    setValue('category', selectedValue); // Update the form value for category
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updatedPost = await updatePost(post._id, data); // Use the API function
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    setIsSubmitting(true);
    try {
      await deletePost(post._id); // Use the API function
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mt-4">ویرایش نوشته</h1>
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
              عنوان
            </label>
            <input
              className={`bg-white border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300`}
              type="text"
              {...register('title')} // Register with react-hook-form
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="subtitle">
              زیرعنوان
            </label>
            <input
              className={`bg-white border ${errors.subtitle ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300`}
              type="text"
              {...register('subtitle')}
            />
            {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle.message}</p>}
          </div>
          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-white" htmlFor="category">
              دسته‌بندی
            </label>
            <div className="relative">
              <div
                className="cursor-default bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                onClick={handleToggleDropdown}
                tabIndex={0}
              >
                <span className="block truncate">{categories.find(cat => cat.value === selectedCategory)?.text}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg className="h-5 w-5 text-gray-400 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              {isOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg sm:text-sm dark:bg-gray-800 dark:border-gray-600 transition-opacity duration-150 ease-in-out">
                  {categories.map((category) => (
                    <div
                      key={category.value}
                      className={`relative cursor-default select-none py-2 pl-10 pr-4 ${selectedCategory === category.value ? 'bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white' : 'text-gray-900 dark:text-gray-300'}`}
                      onClick={() => handleCategoryChange({ target: { value: category.value } })}
                    >
                      <span className={`block truncate ${selectedCategory === category.value ? 'font-medium' : 'font-normal'}`}>
                        {category.text}
                      </span>
                      {selectedCategory === category.value && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-300">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="content">
              محتوا
            </label>
            <textarea
              rows={10}
              className={`bg-white border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 transition-all duration-100`}
              {...register('content')}
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>
          <div className="flex justify-start mt-4">
            <button
              className={`border-blue-500 dark:bg-gray-800 text-blue-500 border px-2 py-1 rounded-md w-24 hover:border-blue-600 dark:border-blue-600 dark:hover:border-blue-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" cx="12" cy="12" r="10" />
                  </svg>
                </span>
              ) : (
                'بروز رسانی'
              )}
            </button>
            <button
              className={`border-red-600 mx-2 dark:bg-gray-800 border text-red-600 px-2 py-1 rounded-md w-24 hover:border-red-700 dark:border-red-700 dark:hover:border-red-800 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              حذف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
