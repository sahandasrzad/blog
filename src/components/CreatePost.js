'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '@/components/Navbar';
import { createPost } from '@/lib/postApi';
import { categories } from '@/data/constants';

// Define Yup schema for validation
const schema = yup.object().shape({
  title: yup.string().required('عنوان الزامی است'),
  subtitle: yup.string().optional(),
  content: yup.string().required('محتوا الزامی است'),
});

export default function CreatePost() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCategoryChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setSelectedCategory(selectedValue);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createPost({ ...data, category: selectedCategory });
      router.push('/'); // Redirect after successful submission
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
        <h1 className="text-2xl font-bold mt-4">افزودن نوشته</h1>
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
              className={`bg-white border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${errors.title ? 'border-red-500' : ''}`}
              type="text"
              {...register('title')}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="subtitle">
              زیرعنوان
            </label>
            <input
              className={`bg-white border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${errors.subtitle ? 'border-red-500' : ''}`}
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
                      onClick={() => handleCategoryChange({ target: { value: category.value } })} // Custom change handler
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
          </div>

          <div className="w-full">
            <label className="block mt-4 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="content">
              محتوا
            </label>
            <textarea
              rows={10}
              cols={10}
              className={`bg-white border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 transition-all duration-100 ${errors.content ? 'border-red-500' : ''}`}
              {...register('content')}
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <button
            className={`bg-blue-500 text-white mt-2 p-2 rounded-md w-24 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
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
              'ثبت'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
