'use client';
import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';

const ChildCategories = ({ categoryName }: { categoryName: string }) => {
  const { categories } = useAppSelector(store => store.data);

  const getCategoryChildren = () => {
    const childrenOfCategory = categories?.find(cat => cat.title === categoryName);
    return childrenOfCategory?.children;
  };

  const categoryChildren = getCategoryChildren();
  if (!categoryChildren) return null;
  return (
    <>
      <div className="w-0.5 h-8 bg-white xl:block hidden"></div>
      {categoryChildren?.map((child, index) => (
        <Link key={`category-child-${index}`} href={`/${child.id}`} className="text-white text-xl">
          {child.title}
        </Link>
      ))}
    </>
  );
};

export default ChildCategories;
