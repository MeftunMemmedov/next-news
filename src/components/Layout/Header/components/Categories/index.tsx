'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { getCategoryList } from '@/redux/data/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(store => store.data);

  useEffect(() => {
    if (categories == null) {
      dispatch(getCategoryList());
    }
  }, [categories]);
  return (
    <div className="w-full flex justify-between font-semibold">
      {categories?.map((category, index) => (
        <Link href={`/${category.id}`} key={`header-category-${index}`} className="text-white">
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
