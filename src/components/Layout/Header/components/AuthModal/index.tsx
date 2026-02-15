'use client';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const AuthModal = () => {
  const [isAuthModalActive, setIsAuthModalActive] = useState<boolean>(false);
  const [activeAuth, setActiveAuth] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthModalActive) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }, [isAuthModalActive]);
  return (
    <>
      <button
        className="text-white hover:text-black hover:bg-white flex items-center gap-3 bg-red px-4 py-2 rounded-md transition"
        onClick={() => setIsAuthModalActive(true)}
      >
        <FaRegUserCircle />
        <span className="lg:block hidden">Sign In</span>
      </button>
      <div
        className={`w-full h-screen fixed ${isAuthModalActive ? 'top-0 bg-black/90' : '-top-full bg-black/90'} z-20 transition-all left-0 bg-black flex justify-center items-center`}
      >
        <button
          onClick={() => setIsAuthModalActive(false)}
          className="text-white absolute top-10 right-10"
        >
          <IoClose size={24} />
        </button>
        <div className="w-full flex justify-center">
          {activeAuth === 'login' ? (
            <form className="lg:w-[450px] w-11/12 relative bg-stone-950 flex flex-col gap-5 md:p-14 p-5">
              <div>
                <label htmlFor="" className="text-stone-400 text-sm mb-2 inline-block">
                  Email
                </label>
                <input type="text" className="border border-neutral-600 w-full h-9" />
              </div>
              <div>
                <label htmlFor="" className="text-stone-400 text-sm mb-2 inline-block">
                  Password
                </label>
                <input type="text" className="border border-neutral-600 w-full h-9" />
              </div>
              <button className="bg-stone-400 font-bold py-3 rounded-md hover:bg-white transition">
                Log In
              </button>
              <div className="text-white">
                No Account then{' '}
                <button type="button" onClick={() => setActiveAuth('register')}>
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form className="lg:w-[450px] w-11/12 relative bg-stone-950 flex flex-col gap-5 md:p-14 p-5">
              <div>
                <label htmlFor="" className="text-stone-400 text-sm mb-2 inline-block">
                  Email
                </label>
                <input type="text" className="border border-neutral-600 w-full h-9" />
              </div>
              <div>
                <label htmlFor="" className="text-stone-400 text-sm mb-2 inline-block">
                  Password
                </label>
                <input type="text" className="border border-neutral-600 w-full h-9" />
              </div>
              <button className="bg-stone-500 font-bold py-3 rounded-md hover:bg-white transition">
                Register
              </button>
              <div className="text-white">
                Have Account? Then{' '}
                <button type="button" onClick={() => setActiveAuth('login')}>
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
