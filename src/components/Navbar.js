'use client';

import Link from 'next/link';

const Navbar = () => {

  return (
    <nav className={`p-4  bg-gray-100`}>
      <ul className="flex text-white">
        <li className={`px-3 py-1 rounded mx-2 bg-gray-200 text-gray-800`}>
          <Link href="/">خانه</Link>
        </li>
        <li className={`px-3 py-1 rounded mx-2 bg-gray-200 text-gray-800`}>
          <Link href="/create">ایجاد نوشته</Link>
        </li>
        <li className={`px-3 py-1 rounded mx-2 mr-auto font-extrabold  text-gray-800`}>
          وبلاگ
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
