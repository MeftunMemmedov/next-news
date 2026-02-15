'use client';
import Link from 'next/link';

import { slugifyTitle } from '@/helpers/common';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  title: string;
  type: string;
}

const CategoryList = ({ title, type }: Props) => {
  const { categories } = useAppSelector(store => store.data);
  const categoryList =
    type === 'parents'
      ? categories?.filter(category => category.parent === null)
      : categories?.flatMap(category => category.children);

  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>

      <div className="flex flex-col gap-1 mt-4">
        {categoryList?.slice(0, 5).map((category, index) => (
          <Link
            key={`footer-category-${index}`}
            href={`/${slugifyTitle(category.title)}`}
            className="text-gray-300"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
