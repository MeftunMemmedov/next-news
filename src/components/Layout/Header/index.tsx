import Link from 'next/link';

import SearchForm from './components/SearchForm';
import SideMenu from './components/SideMenu';
import Categories from './components/Categories';

const Header = () => {
  return (
    <header className="bg-white dark:bg-black ">
      {/* DESKTOP */}
      <div className="container pt-[30px] lg:block hidden">
        <div className="h-[140px] border-b border-gray-600 flex justify-between items-center">
          <div className="flex gap-10 items-center w-1/3">
            <SideMenu />
            {/* <Theme /> */}
          </div>

          <div className="w-1/3 text-center">
            <Link href="/" className="dark:text-white text-red-500 text-3xl">
              NEWS
            </Link>
          </div>

          <div className=" flex justify-end w-1/3">{/* <AuthModal /> */}</div>
        </div>
        <div className="h-[80px] flex items-center justify-between">
          <div className="w-1/6 flex items-center">
            <SearchForm />
          </div>
          <Categories />
          <div className="w-1/6"></div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="h-[80px] container text-white flex justify-between items-center lg:hidden">
        <h2 className="text-2xl">NEWS</h2>
        <div className="flex gap-5">
          {/* <AuthModal /> */}
          <SearchForm />
          <SideMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
