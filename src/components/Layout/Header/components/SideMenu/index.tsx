'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { usePathname } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';

const SideMenu = () => {
  const { categories } = useAppSelector(store => store.data);

  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    if (isMenuActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // }
  }, [isMenuActive]);

  useEffect(() => {
    if (isMenuActive) {
      setIsMenuActive(false);
    }
  }, [pathName]);
  return (
    <>
      <button onClick={() => setIsMenuActive(prevState => !prevState)}>
        <HiBars3CenterLeft color="white" size={30} />
      </button>
      {isMenuActive && (
        <div
          className="fixed z-20 top-0 left-0 w-full h-screen bg-black opacity-35"
          onClick={() => setIsMenuActive(false)}
        ></div>
      )}
      <div
        className={`text-white fixed z-30 ${isMenuActive ? 'left-0 opacity-100' : '-left-[100%] opacity-0'} transition-all duration-200 top-0 lg:w-2xl sm:w-xs w-full h-screen bg-black lg:px-10 px-5`}
      >
        <div className="text-white flex justify-between items-center pb-5 pt-10 mb-10">
          <h3 className="font-bold text-2xl">NEWS</h3>
          <button onClick={() => setIsMenuActive(false)}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-5 lg:ps-10 ps-4">
          {categories?.map((category, index) => (
            <div key={`sidemenu-category-${index}`} className="group">
              <Link href={`/${category.id}`} className="flex items-center  text-xl">
                <IoIosArrowForward className="group-hover:mr-3 transition-all" />
                {category.title}
              </Link>
              <div className="flex flex-col gap-2 mt-4 max-h-0 overflow-hidden group-hover:max-h-36 transition-all duration-500">
                {category.children?.map((child, childIndex) => (
                  <Link
                    key={`child-of-${child.title}-${childIndex}`}
                    href={`/${child.id}`}
                    className="ml-10"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
